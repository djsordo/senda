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
  //equipoSelected : string;

  constructor( private equipoService : EquipoService, 
               private usuarioService : UsuarioService, 
               private crearComponent : CrearComponent,
               private localStorage : LocalStorage, 
               private renderer : Renderer2, 
               private router : Router, 
               private route : ActivatedRoute ) {
    this.initCurrentUser();
  }

  ngOnInit() {
    this.loadEquipos()
      .then( () => {
        console.log( "equipoid:" );
        console.log( this.crearComponent.equipoId );
        this.crearComponent.equipoIdChanged.subscribe( (equipoId : string) => {
          this.markAsSelected( equipoId );
        });
      } );
  }

  private markAsSelected( equipoId : string ){
    this.resultCards.forEach( (card) => {
      if( card.el.id === equipoId ){
        this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
        this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
      }else{
        // resto de elementos quedarán deseleccionados
        this.renderer.setStyle( card.el, "background", "" );
        this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
      }
    });
  }

  private async initCurrentUser(){
    this.usuarioService.getUsuarioBD( this.localStorage.getItem('emailUsuario') )
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }

  private async loadEquipos(){
    return new Promise( (resolve, reject) => {
      this.equipoService.getEquipos()
      .then( (docList: QuerySnapshot<DocumentData>) => {
        this.equipos = [];
        for( let docSnap of docList.docs ){
          this.equipos.push( docSnap );
        }
        resolve( null );
      });
    });
  }

  public onEquipoSelected( equipoId : string ){
    this.crearComponent.setEquipoId( equipoId );
    this.router.navigate( ['..', 'rival'], { relativeTo: this.route } );
  }

}




