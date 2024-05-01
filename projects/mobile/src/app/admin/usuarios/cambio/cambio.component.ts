import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { where } from '@angular/fire/firestore';
        

import { AdminUsuariosPage } from '../admin-usuarios.page';
import { Club } from 'projects/mobile/src/app/modelo/club';
import { Db } from '../../../services/db.service';
import { SecurityService } from '../../../services/security.service';
import { Equipo } from '../../../modelo/equipo';
import { Usuario } from '../../../modelo/usuario';
import { properCase } from '../../../services/string-util';
import { ErrorInfo } from '../../../common/error-info';


@Component({
  selector: 'usuarios-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit, OnDestroy {

  editMode : boolean;
 
  paramSubscription : Subscription;
  userSubscription : Subscription;
  usuarioForm : FormGroup;

  usuarioId : string;

  clubes : Club[];
  equipos : Equipo[];

  errorsWhenSaving : ErrorInfo = null;

  constructor( private mainPage : AdminUsuariosPage, 
               private db : Db,
               private security : SecurityService,
               private toastController : ToastController, 
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() { 
    this.clubes = [];
    this.equipos = [];
    this.usuarioId = null;
    this.createForm();

    if( this.security.getUsuario() ){
      this.loadEquipos( this.security.getUsuario().club.clubId );
    }
    this.userSubscription = this.security.userAuthenticated.subscribe( (userData) => {
      this.loadEquipos( userData[1].club.clubId );
    } );


    this.paramSubscription = this.route.params.subscribe( (params) => {
      if( params.userId ){
        this.editMode = true;
        this.db.getUsuario( params.userId )
        .then( user => {
          this.usuarioId = user.id;
          this.usuarioForm.patchValue( {'usuarioName' : user.nombre,
                                    'usuarioSurname' : user.apellidos, 
                                    'usuarioEmail' : user.email,
                                    'usuarioPermsTemplate' : user?.permsTemplate, 
                                    'usuarioClubId' : user?.perms?.clubes, 
                                    'usuarioEquipoId' : user?.perms?.equipos
                                  });
          for( let rol of user?.roles ){
            (<FormArray> this.usuarioForm.get('roles')).push(
              new FormGroup({
                'permisos' : new FormControl( rol.nombre, Validators.required ), 
                'equipo' : new FormControl( rol.equipo.id )
              })
            );
          }
        })
        .catch( reason => console.error( reason ) );
      }else{
        this.editMode = false;
      }
    } );
  }

  private loadEquipos( clubId : string ){
    return new Promise( (resolve) => {
      this.db.getEquipo( where( "club.clubId", "==", clubId ))
      .then( equipoList => {
        this.equipos = equipoList.map(
            equipo => {
              equipo.screenName = properCase( equipo.categoria ) 
                          + " "
                          + properCase( equipo.genero );
              return equipo;
            });
        resolve( this.equipos );
      });
    });

  }

  getAllRoles() {
    return this.security.allRoles;
  }

  onPermisosSelected( event ){
    if( event.srcElement.value === "admin" ){
      let rolesArray : FormArray = <FormArray> this.usuarioForm.get("roles");
      for( let elem of rolesArray.controls ){
        if( elem.get("permisos").value === "admin" ){
          elem.get("equipo").setValue("");
        }
      }
    }
  }

  getAllEquipos() {
    return this.equipos;
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  onSubmit() {
    console.log( this.usuarioForm.value );
    let formVal = this.usuarioForm.value; 
    let usuario = {
      nombre : formVal.usuarioName, 
      apellidos : formVal.usuarioSurname, 
      email : formVal.usuarioEmail, 
      /* by default, one user can only create users of its own club */
      club : this.security.getUsuario('club'),
      roles : formVal.roles.map( x => { 
          return {equipo: {id: x.equipo}, nombre: x.permisos} } )
    } as Usuario;

    if( this.editMode ){
      this.db.updateUsuario( this.usuarioId, usuario )
      .then( (docRef) => {
        // si el correo electrónico del usuario no existe
        // habrá que crearlo (el viejo quedará en nuestro
        // sistema en un limbo legal)
        this.security.emailExists( usuario.email )
        .then( (emailExists) => {
          if( !emailExists ) {
            this.security.registro( { email: usuario.email, 
              password: '123456' } );
          }
        });
        this.mainPage.onSelectedId.emit( null );
        this.router.navigate( ['/','admin','usuarios'] );        
        this.sendToast( `${formVal.usuarioName} ${formVal.usuarioSurname} se ha cambiado`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al cambiar los datos de ${formVal.usuarioName} ${formVal.usuarioSurname}: ${reason}`);
      });
    }else{

      let loginPromise = this.security.registro( { email: usuario.email, 
                                                  password: '123456' } );
      let dbPromise = this.db.addUsuario( usuario );

      Promise.allSettled([loginPromise, dbPromise])
        .then( results => {
          let loginResult = results[0];
          let dbResult = results[1];
          if( loginResult.status === 'fulfilled' && dbResult.status === 'fulfilled' ){
            this.mainPage.onSelectedId.emit( null );
            this.router.navigate( ['/','admin','usuarios'] );
            this.sendToast( `${formVal.usuarioName} ${formVal.usuarioSurname} se ha creado con contraseña "123456"`);
          }else{
            this.errorsWhenSaving = new ErrorInfo( 'unknownError', 
                      "Error desconocido", 
                      "Se ha producido un error desconocido al guardar usuario" );
            if( dbResult.status !== 'fulfilled' ){
              this.errorsWhenSaving = {
                code : dbResult.reason,
                title : 'Error de base de datos', 
                message : `Se produjo un error al guardar 
                el usuario en base de datos. Es posible que el 
                usuario no haya quedado bien guardado y haya que 
                volver a crearlo. Puede que sea un problema temporal, 
                intentalo más tarde. El error recibido es: ${dbResult.reason}`
              };
            }
            if( loginResult.status !== 'fulfilled' ){
              switch( loginResult.reason.errorCode ){
                case 'auth/email-already-in-use':
                  this.errorsWhenSaving = {
                    code : loginResult.reason.errorCode, 
                    title : 'Usuario ya registrado', 
                    message : `Se produjo un error al registrar
                    los datos en google porque esta dirección corresponde a un usuario
                    ya registrado`
                  };
                  break; 
                case 'auth/invalid-email':
                  this.errorsWhenSaving = {
                    code : loginResult.reason.errorCode,
                    title : 'Correo inválido', 
                    message : `Se produjo un error al registrar
                    los datos en google porque el correo es inválido`
                  };
                  break;
                default: 
                  this.errorsWhenSaving = {
                    code : loginResult.reason.errorCode, 
                    title : 'Error', 
                    message : `Se produjo un error al registrar
                    los datos en google: ${loginResult.reason.errorCode}`
                  };  
                  break;
              }
            }
          }
        });
    }
  }

  clearError() {
    this.errorsWhenSaving = null;
  }

  private createForm(){
    this.usuarioForm = new FormGroup( {
      'usuarioName': new FormControl( null, Validators.required ), 
      'usuarioSurname' : new FormControl( null, Validators.required ), 
      'usuarioEmail' : new FormControl( null, 
                    [ Validators.required, 
                      Validators.email ], 
                      this.alreadyTakenEmail.bind(this) ),
      'roles' : new FormArray([])
    } );
  }

  private alreadyTakenEmail( control : FormControl ) : Promise<any> | Observable<any> {
    return new Promise( (resolve,reject) => {
      this.db.getUsuario( where( "email", "==", control.value ) )
      .then( (userList) => {
        if( userList.length > 1 ){
          resolve( {"emailAlreadyExists": true });
        }
        if( userList.length == 1 ){
          if( this.usuarioId === userList[0].id )
            // we are editing, and the email is our email, so the value is correct
            resolve( null ); 
          else
            // we are editing, but the email isn't ours, so error 
            resolve( {"emailAlreadyExists": true });
        }
        // any other case is correct
        resolve( null );
      })
      .catch( _ => resolve( null ) ); // in the case of an error, return OK
    });
    
  }

  public DEPRECATEDalreadyTakenEmail( control : FormControl ) : Promise<any> | Observable<any>  {
    return new Promise( (resolve, reject) => {
      this.security.emailExists( control.value ) 
        .then( emailExists => {
          if( emailExists ) 
            resolve( {"emailExists" : true } );
          else
            resolve( null ); // ok
          }
        )
        .catch( error => resolve( null ) );
    });
  }

  public onAnadirPermiso() {
    (<FormArray> this.usuarioForm.get('roles')).push(
      new FormGroup({
        'permisos' : new FormControl( null, Validators.required ), 
        'equipo' : new FormControl( null )
      })
    );
  }

  public getRolesFormArray() : FormGroup[] {
    return (<FormGroup[]> 
          (<FormArray> this.usuarioForm.get('roles')).controls
          );
  }

  public deleteRol( controlIndex : number ) {
    (<FormArray> this.usuarioForm.get('roles')).removeAt( controlIndex );
  }

  private async sendToast( message : string ){
    return this.toastController.create({
      message: message, 
      duration: 2000, 
      position: 'middle'
    }).then( (val : HTMLIonToastElement) => {
      val.present();
    })
  }

}





