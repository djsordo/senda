import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, 
          QuerySnapshot } from '@angular/fire/firestore';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/modelo/usuario';
import { Club } from 'src/app/modelo/club';
import { ClubesService } from 'src/app/services/clubes.service';

@Component({
  selector: 'usuarioss-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  usuario : Usuario;
  nombre : string;
  apellidos : string;
  email : string;

  selectedClub : string;

  clubes : Club[];

  constructor( private usuarioService : UsuarioService,
               private clubService : ClubesService,
               private toastController : ToastController, 
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() { 
    this.initCurrentUser();
    this.clubes = [];
    this.clubService.getClubes()
      .then( ( clubesList : QuerySnapshot<DocumentData>) => {
        for( let docData of clubesList.docs ){
          let club = docData.data(); 
          club.id = docData.id;
          console.log( club );
          this.clubes.push( club as Club );
        }
      });
  }

  /**
   * NOT TESTABLE: when using localStorage under a karma 
   * unit testing, there is no localStorage with a saved 
   * email because the browser is clean. Therefore, the 
   * access to the localstorage should be provided through 
   * a proxy service to allow the simulation of that service 
   * when the class is under test. 
   * 
   */
  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD( localStorage.getItem('emailUsuario') )
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }
  
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


