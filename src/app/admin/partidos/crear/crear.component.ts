import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, 
          QueryDocumentSnapshot } from '@angular/fire/firestore';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/modelo/usuario';
import { LocalStorage } from 'src/app/services/local.storage.mock';

@Component({
  selector: 'usuarios-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  usuario : Usuario;
  equipos : QueryDocumentSnapshot<DocumentData>[];
  rivales : Set<string>;
  lugares : Set<string>;

  constructor( private usuarioService : UsuarioService,
               private toastController : ToastController, 
               private router : Router, 
               private route : ActivatedRoute,
               private localStorage : LocalStorage ) { }

  ngOnInit() { 
    this.initCurrentUser();
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD( this.localStorage.getItem('emailUsuario') )
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }
  


  /*
  onClickCrear() {
    console.log( "creando usuario...", this.nombre, this.apellidos );
    let newUsuario = this.usuarioService.newUsuario();
    newUsuario.nombre = this.nombre;
    newUsuario.apellidos = this.apellidos;
    newUsuario.email = this.email;
    if( this.selectedClub ){
      // hay varios clubes, y el usuario ha seleccionado de una lista
      for( let club of this.clubes ){
        if( club.id === this.selectedClub ){
          newUsuario.club = club;
          break;
        }
      }  
    }else {
      // sólo hay un club, y el usuario no ha efectuado ninguna selección
      newUsuario.club = this.clubes[0];
    }
    this.usuarioService.addUsuario( newUsuario )
      .then( docRef =>
          this.sendToast( `${this.nombre} ${this.apellidos} se ha creado con éxito` ) )
      .catch( reason => 
          this.sendToast( `Se ha producido un error al crear el usuario ${this.nombre} ${this.apellidos}`));
    this.router.navigate( ['..'], { relativeTo : this.route } );
  }
  */

  async sendToast( message : string ){
    return this.toastController.create({
      message: message, 
      duration: 2000, 
      position: 'middle'
    }).then( (val : HTMLIonToastElement) => {
      val.present();
    })
  }

}


