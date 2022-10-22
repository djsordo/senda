import { Component, EventEmitter, OnInit, Output, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { DocumentData, 
  QueryDocumentSnapshot, 
  QuerySnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from "@angular/router";


import { Usuario } from "src/app/modelo/usuario";
import { EquipoService } from "src/app/services/equipo.service";
import { LocalStorage } from "src/app/services/local.storage.mock";
import { UsuarioService } from "src/app/services/usuario.service";
import { CrearComponent } from "../crear.component";

@Component({
  selector: 'select-equipo', 
  templateUrl : './select-equipo.component.html', 
  styleUrls : [
    './select-equipo.component.scss'
  ]
})
export class SelectEquipoComponent implements OnInit {

  @ViewChildren('resultCard') resultCards: QueryList<any>;
  usuario : Usuario;
  equipos: QueryDocumentSnapshot<DocumentData>[];
  equipoSelected : string;

  constructor( private equipoService : EquipoService, 
               private usuarioService : UsuarioService, 
               private localStorage : LocalStorage, 
               private renderer : Renderer2, 
               private router : Router, 
               private route : ActivatedRoute,
               private crearComponent : CrearComponent ) {
    this.initCurrentUser();
  }

  ngOnInit() {
    this.loadEquipos();
    // xjx aqui me quedo
    this.equipoSelected = this.crearComponent.equipoId;
    if( this.equipoSelected ){
      this.onEquipoSelected( this.equipoSelected );
    }
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD( this.localStorage.getItem('emailUsuario') )
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }

  private async loadEquipos(){
    this.equipoService.getEquipos()
      .then( (docList: QuerySnapshot<DocumentData>) => {
        this.equipos = [];
        for( let docSnap of docList.docs ){
          this.equipos.push( docSnap );
        }
      });
  }

  public onEquipoSelected( equipoId : string ){
    this.resultCards.forEach( (card) => {
      if( card.el.id === equipoId ){
        if( card.el.id !== this.equipoSelected ){
          this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
          this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
          this.equipoSelected = equipoId;
        }else{
          // simulamos el efecto de que un click 
          // en un elemento seleccionado, deja sin 
          // efecto la selección 
          this.renderer.setStyle( card.el, "background", "" );
          this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
          this.equipoSelected = null;
        }
      }else{
        // resto de elementos quedarán seleccionados
        this.renderer.setStyle( card.el, "background", "" );
        this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
      }
    });
    this.crearComponent.setEquipoId( this.equipoSelected );    
    this.router.navigate( ['..', 'rival'], { relativeTo: this.route } );
  }

}




