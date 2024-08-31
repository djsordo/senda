import { Injectable, inject } from "@angular/core";
import { Auth, 
  User, 
  UserCredential, 
  createUserWithEmailAndPassword, 
  deleteUser, 
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, 
  signOut, 
  updateEmail, 
  updatePassword} from '@angular/fire/auth';
  
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { where } from "@angular/fire/firestore";
import { Observable, of, Subject } from "rxjs";

import { Db } from "./db.service";
import { Usuario } from "../modelo/usuario";
import { LocalStorageService } from "./local.storage.service";
import { ErrorInfo } from "../common/error-info";



export const permissionsGuard = permissionsGuardSync;

/**
 * Synchronous guard function for check permissions. 
 * 
 * This function must match the type CanActivateFn. 
 * This version of the funcion is synchronous: I've
 * discovered that the more correct asynchronous function 
 * DOES NOT WORK, and I think it's a failure of the 
 * Angular framework. 
 * 
 * @param route 
 * @param state 
 * @returns 
 */
function permissionsGuardSync(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) {
  let securityService = inject(SecurityService);
  let router = inject(Router);
  if( !securityService.isAuthenticated() ) {
    return router.parseUrl( '/login' );
  }
  return true;
}


/**
 * Asynchronous guard function for check permissions. 
 * 
 * This function must match the type CanActivateFn. 
 * This version of the funcion is asynchronous: 
 * it's more correct than the synchronous version, but 
 * unfortunately it throws an error every thime we try 
 * to change routes, so by now it's deactivated.
 * 
 * @param route 
 * @param state 
 * @returns 
 */
export function permissionsGuardAsync(route: ActivatedRouteSnapshot,
                          state: RouterStateSnapshot) {
  let securityService = inject(SecurityService);
  let auth = inject(Auth);
  let router = inject(Router);
  if( !securityService.isAuthenticated() ) {
    return new Promise( (resolve) => {
      auth.authStateReady()
        .then( () => {
          if( auth.currentUser )
            resolve( true );
          else
            resolve( router.parseUrl( '/login' ) );
        })
    });
  }
  return true;
}


/**
 * Implementation of guard function with observables. Doesn't work, either. 
 * 
 * @param route 
 * @param state 
 * @returns 
 */
function permissionsGuardObservables(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  let securityService = inject(SecurityService);
  let auth = inject(Auth);
  let router = inject(Router);

  if (securityService.isAuthenticated()) {
    return of(true);
  } else {
    return new Observable( subscriber => {
      auth.authStateReady()
        .then( () => {
          if( auth.currentUser ){
            subscriber.next( true );
          }else{
            subscriber.next( router.parseUrl('/login') );
          }
          subscriber.complete();
        });
    });
    
  }
}




@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public userAuthenticated = new Subject<any>();
  private userData : User  = null;
  public userDb : Usuario = null;
  public allRoles : {rol: string, desc: string}[] = 
      [{rol: 'delegado', 
        desc: 'Delegado'},
       {rol: 'admin', 
        desc: 'Administrador'}];

  constructor(private auth: Auth, 
              private router : Router, 
              private db : Db, 
              private localStorage : LocalStorageService ) { 
    // firebase auth gestiona la re-autenticación del 
    // usuario si se dan las condiciones. Para avisar
    // a la aplicación tiene el método onAuthStateChanged
    // que se dispara cuando el usuario es autenticado
    this.auth.onAuthStateChanged( (user) => {
      if( user ) {
        console.log("onauthstatechanged:", user );
        this.userData = user; 
        this.db.getUsuario( where( 'email', '==', this.userData.email ) )
        .then( usuarios => {
          this.userDb = usuarios[0];
          this.storeUserInformation( this.userData );
          this.userAuthenticated.next( [this.userData, this.userDb ]);
        })
        .catch((error) => {
          console.error( `Parece que el alta de este usuario 
          no se ha realizado correctamente, 
          habla con los administradores 
          (error de base de datos: ${error})` );
        });
      }
    });
  }

  cambioCuentaCorreo( newEmailAccount : string ){
    return updateEmail( this.userData, newEmailAccount );
  }

  /**
   * registramos en firebase auth un usuario con usuario y contraseña. 
   * 
   * Además, el usuario y contraseña creado se convertirá en el 
   * nuevo usuario registrado. 
   * 
   * @param email: el correo electrónico del usuario
   * @param password: la contraseña que el usuario desea poner 
   * @returns 
   */
  registro({ email, password}: any){
    return new Promise( (resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, email, password)
      .then( (userCredential : any ) => {
        sendEmailVerification( userCredential.user )
        .then( (emailSent) => {
          resolve( { result: true } );
        })
        .catch( (error) => reject( { result: false, errorCode: error.code } ) )
      })
      .catch( (error) => {
        // example of result.code: 'auth/email-already-in-use'
        reject( { result: false, errorCode : error.code } );
      })
  
    });
  }

  async cambiarContrasenia( newPassword : string ) {
    return updatePassword( this.userData, newPassword );
  }

  private storeUserInformation( userData: User ){
    this.localStorage.setItem( 'email', userData.email );
    this.localStorage.setItem( 'uid', userData.uid );
    let accessToken = (<any> userData).accessToken;
    this.localStorage.setItem( 'accessToken', accessToken );
    this.localStorage.setItem( 'refreshToken', userData.refreshToken );
  }

  login({ email, password }: any){
    return new Promise( (resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userData : UserCredential ) => {
          this.userData = userData.user;
          this.db.getUsuario( where( 'email', '==', userData.user.email ) )
            .then( usuarios => {
              if( usuarios.length > 0 ){
                this.userDb = usuarios[0];
                this.storeUserInformation( this.userData );
                this.userAuthenticated.next( [this.userData, this.userDb ]);
                resolve( [this.userData, this.userDb] );
              }else{
                reject( new ErrorInfo( "userNotFound", 
                "Usuario no encontrado", 
                `Usuario no existente, posiblemente ha sido 
                borrado: debe ponerse en contacto con su 
                administrador` ) );
              }
            })
            .catch((error) => {
              reject( new ErrorInfo( "databaseError", 
              "Error de base de datos", 
              `La verificación de registro de este 
              usuario no ha funcionado bien, por 
              favor intentelo más tarde. ${error}` ) );
            });
        })
        .catch( (error) => {
          if( error.code === 'auth/network-request-failed' ){
            reject( new ErrorInfo(error.code, 
            "No hay conexión", 
            `No hay conexión con la base de datos, inténtelo más tarde ${error.code}`));
          }
          reject( new ErrorInfo(error.code, 
            "Usuario no encontrado", 
            `No existe el usuario o clave erronea. ${error.code}` ) );
        } );
    });
  }

  isAuthenticated() : boolean {
    if(this.userDb && this.userData)
      return true;
    else
      return false;
  }

  iForgotMyPassword( email : string ) {
    sendPasswordResetEmail( this.auth, email )
  }

  logout() {
    this.userAuthenticated.next( null );
    return signOut(this.auth);
  }

  getUsuario( property?: string ){
    if( this.userDb )
      if( property )
        return this.userDb[property];
      else
        return this.userDb;
  }

  userHasRole( roleList : string[] ){
    return this.userDb 
          && this.userDb.roles 
          && this.userDb.roles.find( userRole => 
      {
        let found = roleList.find( roleElement => 
            roleElement === userRole.nombre || roleElement === '*' );
        return found;
      });
  }

  deleteCurrentLoggedUser(){
    return new Promise( (resolve, reject) => {
      if( this.userDb && this.userDb.id ){
        this.db.delUsuario( this.userDb.id );
      }
      deleteUser( this.userData )
        .then( () => {
          this.logout();
          resolve( true );
        } )
        .catch( (error) => {
          reject( error );
        })
      });
  }

}


