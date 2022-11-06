import { Component, 
        OnInit, 
        QueryList, 
        Renderer2, 
        ViewChildren } from "@angular/core";
import { DocumentData, 
        QueryDocumentSnapshot, 
        QuerySnapshot } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from "@angular/router";


import { EquipoService } from "src/app/services/equipo.service";
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
  equipos: QueryDocumentSnapshot<DocumentData>[];

  constructor( private equipoService : EquipoService, 
               private crearComponent : CrearComponent,
               private renderer : Renderer2, 
               private router : Router, 
               private route : ActivatedRoute ) {
  }

  ngOnInit() {
    console.log( 'ngOnInit select equipo');
    this.loadEquipos()
      .then( () => {
        console.log( "equipo es: ", this.crearComponent.equipoId );
        // A VER, ESTO NO FUNCIONA PORQUE DEBERÍA 
        // EJECUTARSE CUANDO SE HUBIERA TERMINADO 
        // DE CARGAR LA LISTA DE TARJETAS: EN EL 
        // MOMENTO EN QUE SE DISPARA, NO SE HA CARGADO 
        // NINGUNA TARJETA AÚN
        setTimeout( () => {
          this.markAsSelected( this.crearComponent.equipoId );
        }, 2000 );
      } );
    // la subscripción es necesaria para 
    // cuando efectúo cambios en la página
    this.crearComponent.equipoIdChanged.subscribe( (equipoId : string) => {
      this.markAsSelected( equipoId );
    });
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




