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

@Component({
  selector: 'equipos-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent implements OnInit {

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

  constructor( private usuarioService : UsuarioService,
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

  
  onClickCrear() {
    console.log( "creando equipo...", this.nombre );
    console.log( "selected categoria vale: ", this.selectedCategoria );
    console.log( "selected genero vale ", this.selectedGenero );
    console.log( "typed genero vale: ", this.typedGenero );
    let newEquipo = this.equipoService.newEquipo();
    newEquipo.nombre = this.nombre;
    newEquipo.club = this.usuario.club;
    if( this.selectedCategoria !== '#otro#' )
      newEquipo.categoria = this.selectedCategoria;
    else
      newEquipo.categoria = this.typedCategoria;
    if( this.selectedGenero !== '#otro#' )
      newEquipo.genero = this.selectedGenero;
    else
      newEquipo.genero = this.typedGenero;
    if( this.selectedTemporada !== '#otro#' ){
      newEquipo.temporada = this.selectedTemporada;
    }
    else
      newEquipo.temporada = this.typedTemporada;
    this.equipoService.addEquipo( newEquipo )
      .then( (docRef) => {
        this.sendToast( `Equipo ${this.nombre} creado con éxito` );
      })
      .catch( (reason) => {
        this.sendToast( `Se ha producido un error al crear el equipo ${this.nombre}: ${reason}`);
      });
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


