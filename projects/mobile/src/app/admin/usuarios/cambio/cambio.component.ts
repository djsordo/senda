import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormArray, 
          FormControl, 
          FormGroup, 
          Validators } from '@angular/forms';
import { where } from '@angular/fire/firestore';
        

import { AdminUsuariosPage } from '../admin-usuarios.page';
import { Club } from 'projects/mobile/src/app/modelo/club';
import { Db } from '../../../services/db.service';
import { SecurityService } from '../../../services/security.service';
import { Equipo } from '../../../modelo/equipo';
import { Usuario } from '../../../modelo/usuario';
import { properCase } from '../../../services/string-util';
import { ErrorInfo } from '../../../common/error-info';
import { ToastService } from '../../../services/toast.service';


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
               private toastService : ToastService, 
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


  ngOnDestroy() {
    this.paramSubscription && this.paramSubscription.unsubscribe();
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  private loadEquipos( clubId : string ){
    return new Promise( (resolve) => {
      this.db.getEquipo( where( "club.clubId", "==", clubId ))
      .then( equipoList => {
        this.equipos = equipoList.map(
            equipo => {
              if( equipo.nombreCorto )
                equipo.screenName = properCase( equipo.categoria ) 
                            + " "
                            + properCase( equipo.genero )
                            + " "
                            + properCase( equipo.nombreCorto );
              else 
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

  onSubmit() {
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
        this.router.navigate( ['/','admin','usuarios'] );        
        this.toastService.sendToast( `${formVal.usuarioName} ${formVal.usuarioSurname} se ha cambiado`);
      })
      .catch( (reason) => {
        this.toastService.sendToast(`Se ha producido un error al cambiar los datos de ${formVal.usuarioName} ${formVal.usuarioSurname}: ${reason}`);
      });

    }else{

      this.db.addUsuario( usuario, usuario.email )
      .then( () => {
        this.router.navigate( ['/','admin','usuarios'] );
        this.toastService.sendToast( `${formVal.usuarioName} ${formVal.usuarioSurname} se ha creado: ahora el usuario deberá registrarse en la aplicación`);
      })
      .catch( error => {
        this.errorsWhenSaving = {
          code : error,
          title : 'Error de base de datos', 
          message : `Se produjo un error al guardar 
          el usuario en base de datos. Es posible que el 
          usuario no haya quedado bien guardado y haya que 
          volver a crearlo. Puede que sea un problema temporal, 
          intentalo más tarde. El error recibido es: ${error}`
        };

      })

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
                      this.alreadyTakenEmailValidator.bind(this) ),
      'roles' : new FormArray([])
    } );
  }

  private alreadyTakenEmailValidator( control : FormControl ): Promise<any> | Observable<any> {
    return new Promise( (resolve, reject) => {
      this.alreadyTakenEmail( control.value )
        .then( (result) => {
          if( result )
            resolve({"emailAlreadyTaken": true});
          else
            resolve( null ); // email not taken
        })
        .catch( _ => resolve( null ) ); // ignore the error, the email is not taken 
    } );
  }

  private alreadyTakenEmail( email : string ) : Promise<any> {
    return new Promise( (resolve,reject) => {
      this.db.getUsuario( where( "email", "==", email ) )
      .then( (userList) => {
        if( userList.length > 1 ){
          resolve( true );
        }
        if( userList.length == 1 ){
          if( this.usuarioId === userList[0].id )
            // we are editing, and the email is our email, so the value is correct
            resolve( null ); 
          else
            // we are editing, but the email isn't ours, so error 
            resolve( true );
        }
        // any other case is correct
        resolve( false );
      })
      .catch( (error) => reject( error ) ); // in the case of an error, return OK
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

}





