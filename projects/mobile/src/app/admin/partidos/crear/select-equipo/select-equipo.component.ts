import { Component, 
        OnInit, 
        QueryList, 
        Renderer2, 
        ViewChildren } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";


import { EquipoService } from "projects/mobile/src/app/services/equipo.service";
import { CrearComponent } from "../crear.component";
import { Db } from "projects/mobile/src/app/services/db.service";
import { Equipo } from "projects/mobile/src/app/modelo/equipo";

@Component({
  selector: 'select-equipo', 
  templateUrl : './select-equipo.component.html', 
  styleUrls : [
    './select-equipo.component.scss'
  ]
})
export class SelectEquipoComponent implements OnInit {

  @ViewChildren('resultCard') resultCards: QueryList<any>;
  equipos: Equipo[];

  constructor( private db : Db,
               private crearComponent : CrearComponent,
               private renderer : Renderer2, 
               private router : Router, 
               private route : ActivatedRoute ) {
  }

  ngOnInit() {
    this.loadEquipos()
      .then( () => {
        this.resultCards.changes.subscribe(() => { this.markAsSelected( this.crearComponent.equipoId ); });
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

  private loadEquipos(){
    return new Promise( (resolve) => {
      this.db.getEquipo( null )
        .then( equipoList => {
          this.equipos = equipoList;
          resolve( null );
        });
    }); 
  }

  public onEquipoSelected( equipoId : string ){
    this.crearComponent.setEquipoId( equipoId );
    this.router.navigate( ['..', 'rival'], { relativeTo: this.route } );
  }

}




