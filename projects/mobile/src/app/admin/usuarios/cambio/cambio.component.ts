import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
        

import { Usuario } from 'projects/mobile/src/app/modelo/usuario';
import { AdminUsuariosPage } from '../admin-usuarios.page';
import { Club } from 'projects/mobile/src/app/modelo/club';
import { Db } from '../../../services/db.service';
import { SecurityService } from '../../../services/security.service';
import { Equipo } from '../../../modelo/equipo';
import { where } from '@angular/fire/firestore';


@Component({
  selector: 'usuarios-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit, OnDestroy {

  editMode : boolean;
 
  paramSubscription : Subscription;
  usuarioForm : FormGroup;

  usuarioId : string;

  clubes : Club[];
  equipos : Equipo[];

  errorsWhenSaving = 
      { error : false, 
        message : 'ESTO ES UNA PRUEBA' };

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

    this.loadEquipos( );
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
          /* xjx this.onChangeClubes(); */
        })
        .catch( reason => console.error( reason ) );
      }else{
        this.editMode = false;
      }
    } );
  }

  private loadEquipos( ){
    console.log( this.security.getClubIdUsuario() );
    return new Promise( (resolve, reject) => {
      this.db.getEquipo( where( "club.clubId", "==", this.security.getUsuario('club.clubId') ))
      .then( equipoList => {
        this.equipos = Array.from( equipoList );
        console.log('lista de equipos');
        console.log( this.equipos );
        resolve( this.equipos );
      });
    });

  }

  getAllRoles() {
    return this.security.allRoles;
  }

  getAllEquipos() {
    return this.equipos;
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

  onSubmit() {
    console.log('this is the onsubmit method');
  }

  clearError() {
  }

  private createForm(){
    this.usuarioForm = new FormGroup( {
      'usuarioName': new FormControl( null, Validators.required ), 
      'usuarioSurname' : new FormControl( null, Validators.required ), 
      'usuarioEmail' : new FormControl( null, 
                    [ Validators.required, 
                      Validators.email ] )
    } );
  }

/* xjx 
  onSubmit() {
    console.log( this.usuarioForm.value );
    let formVal = this.usuarioForm.value; 
    let usuario = {
      nombre : formVal.usuarioName, 
      apellidos : formVal.usuarioSurname, 
      email : formVal.usuarioEmail, 
      permsTemplate : formVal.usuarioPermsTemplate
    } as Usuario;
    if( formVal.usuarioPermsTemplate ){
      usuario.perms = this.security.convertTemplateIntoPerms( 
          this.permissionsTemplate[this.usuarioForm.value.usuarioPermsTemplate], 
          this.usuarioForm.value.usuarioClubId, 
          this.usuarioForm.value.usuarioEquipoId );
    }
    if( this.editMode ){
      this.db.updateUsuario( this.usuarioId, usuario )
      .then( (docRef) => {
        this.mainPage.onSelectedId.emit( null );
        this.router.navigate( ['/','admin','usuarios'] );        
        this.sendToast( `${formVal.usuarioName} ${formVal.usuarioSurname} se ha cambiado`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al cambiar los datos de ${formVal.usuarioName} ${formVal.usuarioSurname}: ${reason}`);
      });
    }else{
      let loginPromise = this.login.registro( { email: usuario.email, 
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
            this.errorsWhenSaving.error = true;
            if( dbResult.status !== 'fulfilled' ){
              this.errorsWhenSaving.message = `Se produjo un error al guardar 
              el usuario en base de datos. Es posible que el 
              usuario no haya quedado bien guardado y haya que 
              volver a crearlo. Puede que sea un problema temporal, 
              intentalo más tarde. El error recibido es: ${dbResult.reason}`;
            }
            if( loginResult.status !== 'fulfilled' ){
              if( loginResult.reason.errorCode === 'auth/email-already-in-use' ){
                this.errorsWhenSaving.message = `Se produjo un error al registrar
                los datos en google porque esta dirección corresponde a un usuario
                ya registrado`;  
              }if( loginResult.reason.errorCode === 'auth/invalid-email' ){
                this.errorsWhenSaving.message = `Se produjo un error al registrar
                los datos en google porque según google el correo es inválido`;
              }else{
                this.errorsWhenSaving.message = `Se produjo un error al registrar
                los datos en google`;  
              }
            }
          }

        });
    }
  }

  clearError() {
    this.errorsWhenSaving = { error: false, message : '' };
  }

  get permissionsTemplateNames() : string[] {
    let result : string[] = [];
    for( let templateName in this.permissionsTemplate ) {
      if( templateName !== 'id' )
        result.push( templateName );
    }
    return result;
  }

  isManyClub(){
    try{
      return this.permissionsTemplate[this.usuarioForm.value.usuarioPermsTemplate].clubes === 'pickMany';
    }catch( err ){
      return false; 
    }
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
*/
}


