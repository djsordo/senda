import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, 
        DocumentSnapshot, 
        QuerySnapshot } from '@angular/fire/firestore';


import { Usuario } from 'src/app/modelo/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AdminUsuariosPage } from '../admin-usuarios.page';
import { ClubesService } from 'src/app/services/clubes.service';
import { Club } from 'src/app/modelo/club';


@Component({
  selector: 'usuarios-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  docSnapshot : DocumentSnapshot<DocumentData>; 

  usuario : Usuario;
  nombre : string;
  apellidos : string; 
  email : string; 
  
  selectedClub : string; 

  clubes : Club[];

  constructor( private mainPage : AdminUsuariosPage, 
               private usuarioService : UsuarioService,
               private clubService : ClubesService,
               private toastController : ToastController, 
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() { 
    this.initCurrentUser();
    this.clubes = [];
    this.clubService.getClubes()
      .then( (clubList : QuerySnapshot<DocumentData>) => {
        this.clubes = [];
        for( let clubDoc of clubList.docs ){
          let club = clubDoc.data();
          club.id = clubDoc.id; 
          this.clubes.push( club as Club );
        }
      });
    if( this.mainPage.getSelectedId() ){
      this.usuarioService.getUsuarioById( this.mainPage.getSelectedId() )
        .then( ( val : DocumentSnapshot<DocumentData>) => {
          this.docSnapshot = val;
          this.nombre = val.data().nombre; 
          this.apellidos = val.data().apellidos;
          this.email = val.data().email; 
          this.selectedClub = val.data().club?.id;
        })
        .catch( reason => console.error( reason ) );
    }
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
    });
  }

  onClickCambiar() {
    let usuario = this.usuarioService.newUsuario();
    usuario.nombre = this.nombre; 
    usuario.apellidos = this.apellidos;
    usuario.email = this.email; 
    if( this.selectedClub ){
      // hay más de un club, y el usuario ha seleccionado uno
      usuario.club = this.clubes.find( (club : Club) => club.id === this.selectedClub );
    }else{
      // no hay más que un club
      usuario.club = this.clubes[0];
    }
    this.usuarioService.updateUsuario( usuario )
      .then( (docRef) => {
        this.sendToast( `${this.nombre} ${this.apellidos} se ha cambiado con éxito`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al cambiar los datos de ${this.nombre} ${this.apellidos}: ${reason}`);
      });
    this.mainPage.onSelectedId.emit( null );
    this.router.navigate( ['..'], { relativeTo : this.route } );
  }

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


