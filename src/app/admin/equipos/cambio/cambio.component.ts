import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DocumentData, 
        DocumentSnapshot, 
        QuerySnapshot } from '@angular/fire/firestore';
import { Temporada } from 'src/app/modelo/temporada';
import { Usuario } from 'src/app/modelo/usuario';

import { properCase } from 'src/app/services/string-util';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AdminEquiposPage } from '../admin-equipos.page';
import { Equipo } from 'src/app/modelo/equipo';


@Component({
  selector: 'equipos-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  equipo : DocumentSnapshot<DocumentData>;

  usuario : Usuario;
  nombre : string;
  
  selectedCategoria : string;
  typedCategoria : string;
  
  selectedGenero : string;
  typedGenero : string;
  
  selectedTemporada : string; 
  typedTemporada : string; 

  categorias : Set<string>;
  generos : Set<string>;
  temporadas : Set<Temporada>;

  constructor( private mainPage : AdminEquiposPage, 
               private usuarioService : UsuarioService,
               private equipoService : EquipoService,
               private toastController : ToastController, 
               private router : Router, 
               private route : ActivatedRoute ) { }

  ngOnInit() { 
    this.initCurrentUser();
    this.initThingsToDo();
    this.equipoService.getEquipos()
      .then( ( equipoList : QuerySnapshot<DocumentData>) => {
        for( let equipo of equipoList.docs ){
          this.thingsToDoPerEquipo( equipo );
        }
      });
    if( this.mainPage.getSelectedId() ){
      this.equipoService.getEquipoById( this.mainPage.getSelectedId() )
        .then( ( val : DocumentSnapshot<DocumentData>) => {
          this.equipo = val;
        });
    }
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuario(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }

  private initThingsToDo(){
    this.categorias = new Set<string>();
    this.generos = new Set<string>();
    this.temporadas = new Set<Temporada>();
  }

  private thingsToDoPerEquipo( equipo : DocumentData ){
    if( equipo.data().categoria )
      this.categorias.add( properCase( equipo.data().categoria ) );
    if( equipo.data().genero )
      this.generos.add( properCase( equipo.data().genero ) );
    if( equipo.data().temporada ){
      this.addIfNotPresent( this.temporadas, 
                          equipo.data().temporada, 
                          ( v1, v2 ) => {return v1.alias === v2.alias; } );
    }
  }

  private addIfNotPresent( s1 : Set<any>, 
                            newVal : any, 
                            comparison : ( v1 : any, v2 : any ) => boolean ) {
    let present = false; 
    for( let val of s1 ){
      present = present || comparison( val, newVal );
    }
    if( !present ) 
      s1.add( newVal ); 
  }


  onClickCambiar() {
    let equipoData = this.equipoService.newEquipo();
    equipoData.nombre = this.nombre; 
    this.equipoService.updateEquipo( this.equipo, 
                          equipoData )
      .then( (docRef) => {
        this.sendToast( `Club ${this.nombre} se ha cambiado con éxito`);
      })
      .catch( (reason) => {
        this.sendToast(`Se ha producido un error al cambiar el club ${this.nombre}: ${reason}`);
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


