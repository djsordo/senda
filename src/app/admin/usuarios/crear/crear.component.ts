import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, 
          QuerySnapshot } from '@angular/fire/firestore';

import { UsuarioService } from 'src/app/services/usuario.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { properCase } from 'src/app/services/string-util';
import { Usuario } from 'src/app/modelo/usuario';
import { Temporada } from 'src/app/modelo/temporada';
import { TemporadaService } from 'src/app/services/temporada.service';
import { Club } from 'src/app/modelo/club';
import { ClubesService } from 'src/app/services/clubes.service';

@Component({
  selector: 'equipos-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

  usuario : Usuario;
  nombre : string;
  apellidos : string;
  email : string;

  selectedClub : string;
  typedClub : string;

  clubes : Set<Club>;

  constructor( private usuarioService : UsuarioService,
               private clubService : ClubesService,
               private toastController : ToastController, 
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() { 
    this.initCurrentUser();
    this.clubes = new Set<Club>();
    this.clubService.getClubes()
      .then( ( clubesList : QuerySnapshot<DocumentData>) => {
        for( let docData of clubesList.docs ){
          let club = docData.data(); 
          club.id = docData.id;
          this.clubes.add( club as Club );
        }
      });
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }
  
  onClickCrear() {
    console.log( "creando equipo...", this.nombre );
    let newUsuario = this.usuarioService.newUsuario();
    newUsuario.nombre = this.nombre;
    newUsuario.apellidos = this.apellidos;
    for( let club of this.clubes ){
      console.log('el club actual es', club ); 
      if( club.id === this.selectedClub ){
        newUsuario.club = club;
        break;
      }
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


