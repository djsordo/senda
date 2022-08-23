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
import { TemporadaService } from 'src/app/services/temporada.service';


@Component({
  selector: 'equipos-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  docSnapshot : DocumentSnapshot<DocumentData>; 

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
  generosKeys : string[];
  temporadas : Set<Temporada>;

  constructor( private mainPage : AdminEquiposPage, 
               private usuarioService : UsuarioService,
               private temporadaService : TemporadaService,
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
          this.docSnapshot = val;
          this.nombre = val.data().nombre; 
          this.selectedCategoria = val.data().categoria;
          this.selectedGenero = val.data().genero;
          this.selectedTemporada = val.data().temporada.alias;
        })
        .catch( (reason) => {
          console.error( reason );
        })
    }
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
    });
  }

  private initThingsToDo(){
    this.categorias = new Set<string>();
    this.generos = new Set<string>();
    this.temporadas = new Set<Temporada>();
  }

  private thingsToDoPerEquipo( equipo : DocumentData ){
    if( equipo.data().categoria )
      this.categorias.add( equipo.data().categoria );
    if( equipo.data().genero ){
      this.generos.add( equipo.data().genero );
    }
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
    let equipo = this.equipoService.newEquipo();
    equipo.nombre = this.nombre; 
    equipo.club = this.usuario.club; 
    if( this.selectedCategoria !== '#otro#' )
      equipo.categoria = this.selectedCategoria;
    else
      equipo.categoria = this.typedCategoria; 
    if( this.selectedGenero !== '#otro#' )
      equipo.genero = this.selectedGenero; 
    else 
      equipo.genero = this.typedGenero; 
    if( this.selectedTemporada !== '#otro#' ){
      console.log('entro por otro');
      console.log( this.selectedTemporada );
      for( let temporada of this.temporadas ){
        console.log( temporada.alias );
        if( temporada.alias === this.selectedTemporada ){
          equipo.temporada = temporada;
          break;
        }
      }
    }else{
      let temporada = { alias : this.typedTemporada, 
        nombre : this.typedTemporada };
      this.temporadaService.addTemporada( temporada );
      equipo.temporada = temporada;
    }
    console.log( equipo );
    this.equipoService.updateEquipo( this.docSnapshot, 
                          equipo )
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


