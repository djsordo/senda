import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temporada } from 'projects/mobile/src/app/modelo/temporada';

import { EquipoService } from 'projects/mobile/src/app/services/equipo.service';
import { AdminEquiposPage } from '../admin-equipos.page';
import { TemporadaService } from 'projects/mobile/src/app/services/temporada.service';
import { SecurityService } from '../../../services/security.service';
import { ToastService } from '../../../services/toast.service';
import { Db } from '../../../services/db.service';
import { Equipo } from '../../../modelo/equipo';
import { Subscription } from 'rxjs';
import { ListItem } from '../../../modelo/config';


@Component({
  selector: 'equipos-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription = null;


  categorias : ListItem[];
  generos : ListItem[];
  temporadas : Temporada[];

  equipoId : string = null;

  // MODELO DE DATOS NO REVISADO AUN 


  nombre : string;
  
  selectedCategoria : string;
  typedCategoria : string;
  
  selectedGenero : string;
  typedGenero : string;
  
  selectedTemporada : string; 
  typedTemporada : string; 

  generosKeys : string[];

  constructor( private mainPage : AdminEquiposPage, 
               private db : Db,
               private toastService : ToastService,
               private security : SecurityService,
               private temporadaService : TemporadaService,
               private equipoService : EquipoService,
               private router : Router,
               private route : ActivatedRoute ) { }

  ngOnInit() { 
    this.categorias = [];
    this.generos = [];
    this.temporadas = [];
    this.equipoId = null; 
    this.paramSubscription = 
      this.route.paramMap.subscribe( (paramMap) => {
        this.db.getEquipo( paramMap.get('equipoId') )
          .then( (equipo) => {
            console.log( equipo); 
            this.equipoId = equipo.id;
            this.nombre = equipo.nombre; 
            this.selectedCategoria = equipo.categoria; 
            this.selectedGenero = equipo.genero; 
            this.selectedTemporada = equipo.temporada.alias;
          })
      });

    this.loadConfig();
  }

  ngOnDestroy(): void {
    this.paramSubscription && this.paramSubscription.unsubscribe();
  }

  private loadConfig(){
    this.db.getConfig( "config" )
      .then( (configObj) => {
        this.categorias = configObj.categorias;
        this.generos = configObj.generos;
      } );
    this.db.getTemporada( null )
      .then( (temporadaList) => {
        for( let temporada of temporadaList )
          this.temporadas.push( temporada ); 
      });
  }

  /**
   * Tells if we are editing an existing team or creating a new one.
   * 
   * @returns true if we are editing a Team, false otherwise 
   */
  private editMode(){
    return this.equipoId;
  }

  onClickCambiar() {
    let equipo = this.equipoService.newEquipo();
    equipo.nombre = this.nombre; 
    equipo.club = this.security.getUsuario('club'); 
    if( this.selectedCategoria !== '#otro#' )
      equipo.categoria = this.selectedCategoria;
    else
      equipo.categoria = this.typedCategoria; 
    if( this.selectedGenero !== '#otro#' )
      equipo.genero = this.selectedGenero; 
    else 
      equipo.genero = this.typedGenero; 
    if( this.selectedTemporada !== '#otro#' ){
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
    if( this.editMode() ){
      this.db.updateEquipo( this.equipoId, equipo )
      .then( (docRef) => {
        this.toastService.sendToast( `Equipo ${this.nombre} se ha cambiado con éxito`);
      })
      .then( _ => {
        this.mainPage.onSelectedId.emit( null );
        this.router.navigate( ['/', 'admin', 'equipos'], { relativeTo : this.route } );    
      })
      .catch( (reason) => {
        this.toastService.sendToast(`Se ha producido un error al cambiar el club ${this.nombre}: ${reason}`);
      });      
    }else{
      this.db.addEquipo( equipo )
      .then( (docRef) => {
        this.toastService.sendToast( `Equipo ${this.nombre} se ha cambiado con éxito`);
      })
      .then( _ => {
        this.mainPage.onSelectedId.emit( null );
        this.router.navigate( ['/', 'admin', 'equipos'],  );    
      })
      .catch( (reason) => {
        this.toastService.sendToast(`Se ha producido un error al cambiar el club ${this.nombre}: ${reason}`);
      });      
    }
  
  }

}


