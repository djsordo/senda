import { Injectable, inject } from "@angular/core";
import { Auth, 
  User, 
  UserCredential, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword, 
  signOut } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Db } from "./db.service";
import { Usuario } from "../modelo/usuario";
import { where } from "@angular/fire/firestore";
import { LocalStorageService } from "./local.storage.service";
import { Subject } from "rxjs";

/* function signature must be of type CanActivateFn */
export function permissionsGuard(route: ActivatedRouteSnapshot,
                          state: RouterStateSnapshot) {
  let securityService = inject(SecurityService);
  let router = inject(Router);
  if( !securityService.isAuthenticated() ) {
    return new Promise( (resolve, reject) => {
      securityService.reloadUser()
        .then( (user) => {
          resolve( true );
        })
        .catch( error => {
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
  private tokenExpiration : Date = null;
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

  private setTokenExpiration( expirationInSeconds : number ): void {
    setTimeout(() => {
      this.router.navigate( ['/login' ] );
      
    }, expirationInSeconds );
    this.tokenExpiration = new Date( Date.now() + ( expirationInSeconds * 1000 ) );
  }

  // esta función registra en firebase auth un usuario con email y password
  registro({ email, password}: any){
    return new Promise( (resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, email, password)
      .then( (userCredential : any ) => {
        console.log( "user credential:", userCredential );
        this.setTokenExpiration( parseInt( userCredential._tokenResponse.expiresIn ) );
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
          reject('No se ha encontrado información de autenticación');
        }
      });
    });
  }

  login({ email, password }: any){
    return new Promise( (resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userData : UserCredential ) => {
          this.userData = userData.user;
          console.log('segunda respuesta llamada login'); 
          console.log( userData );
          this.db.getUsuario( where( 'email', '==', userData.user.email ) )
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
        })
        .catch( (error) => {
          reject( `No existe el usuario o clave erronea. ${error.code}` );
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

}


