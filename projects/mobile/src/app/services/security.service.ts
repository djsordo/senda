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
  updatePassword} from '@angular/fire/auth';
  
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { where } from "@angular/fire/firestore";
import { Subject } from "rxjs";

import { Db } from "./db.service";
import { Usuario } from "../modelo/usuario";
import { LocalStorageService } from "./local.storage.service";
import { ErrorInfo } from "../common/error-info";

/* function signature must be of type CanActivateFn */
export function permissionsGuard(route: ActivatedRouteSnapshot,
                          state: RouterStateSnapshot) {
  let securityService = inject(SecurityService);
  let router = inject(Router);
  console.log( 'is authenticated: ', securityService.isAuthenticated() );
  if( !securityService.isAuthenticated() ) {
    return new Promise( (resolve, reject) => {
      securityService.reloadUser()
        .then( (user) => {
          console.log('recargamos y resolvemos cierto');
          resolve( true );
        })
        .catch( error => {
          console.log('resolvemos con error y vamos a login');
          console.error( 'Error trying to authenticate user, redirecting to login screen' );
          resolve( router.parseUrl( '/login' ) );
        })
    });
  }
  return true;
}


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public userAuthenticated = new Subject<any>();
  private userData : User  = null;
  private userDb : Usuario = null;
  public allRoles : {rol: string, desc: string}[] = 
      [{rol: 'delegado', 
        desc: 'Delegado'},
       {rol: 'admin', 
        desc: 'Administrador'}];

  constructor(private auth: Auth, 
              private router : Router, 
              private db : Db, 
              private localStorage : LocalStorageService ) { }

  cambioCuentaCorreo( oldEmailAccount : string, newEmailAccount : string ){
    //updateEmail( )
  }

  
  // esta función registra en firebase auth un usuario con email y password
  registro({ email, password}: any){
    return new Promise( (resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, email, password)
      .then( (userCredential : any ) => {
        console.log( "user credential:", userCredential );
        sendEmailVerification( userCredential.user )
        .then( (emailSent) => {
          console.log( "email verification response:", emailSent );
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

  private storeUserInformation( userData: User, userDb: Usuario ){
    this.localStorage.setItem( 'email', userData.email );
    this.localStorage.setItem( 'uid', userData.uid );
    let accessToken = (<any> userData).accessToken;
    this.localStorage.setItem( 'accessToken', accessToken );
    this.localStorage.setItem( 'refreshToken', userData.refreshToken );
  }

  reloadUser(){
    return new Promise( (resolve, reject) => {
      this.auth.onAuthStateChanged( (user) => {
        if( user ) {
          console.log("onauthstatechanged");
          this.userData = user; 
          this.db.getUsuario( where( 'email', '==', this.userData.email ) )
          .then( usuarios => {
            this.userDb = usuarios[0];
            this.storeUserInformation( this.userData, this.userDb );
            this.userAuthenticated.next( [this.userData, this.userDb ]);
            resolve( [this.userData, this.userDb] );
          })
          .catch((error) => {
            reject( `Parece que el alta de este usuario 
            no se ha realizado correctamente, 
            habla con los administradores 
            (error de base de datos)` );
          });
        }else{
          reject('No se ha encontrado información de autenticación, ¿estás en la pantalla de login?');
        }
      });
    });
  }

  login({ email, password }: any){
    return new Promise( (resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userData : UserCredential ) => {
          console.log( userData );
          this.userData = userData.user;
          this.db.getUsuario( where( 'email', '==', userData.user.email ) )
            .then( usuarios => {
              if( usuarios.length > 0 ){
                this.userDb = usuarios[0];
                this.storeUserInformation( this.userData, this.userDb );
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


