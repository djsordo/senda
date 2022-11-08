import { Component, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { DocumentData, 
  QuerySnapshot} from '@angular/fire/firestore';
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Subscription } from "rxjs";


import { PartidosService } from "src/app/services/partidos.service";
import { CrearComponent } from "../crear.component";


@Component({
  selector: 'select-lugar', 
  templateUrl : './select-lugar.component.html',
  styleUrls : [
    './select-lugar.component.scss'
  ]
})
export class SelectLugarComponent implements OnInit {

  @ViewChildren('resultCard') resultCards : QueryList<any>;
  lugares : Set<string>;
  lugarSelected : string;

  public constructor( private partidoService : PartidosService, 
                      private renderer : Renderer2, 
                      private router : Router, 
                      private route : ActivatedRoute,
                      public  crearComponent : CrearComponent ){

  }

  public ngOnInit(): void {
    this.loadLugares()
      .then( () => {
        this.resultCards.changes.subscribe( () => {
          this.markAsSelected( this.crearComponent.lugarName );
        });
      } );
    // la subscripción es necesaria para cuando efectúo 
    // cambios en la página
    this.crearComponent.lugarChanged.subscribe( (lugarName:string) => {
      this.markAsSelected( lugarName );
    });
  }

  private markAsSelected( lugarName : string ){
    this.resultCards.forEach( (card) => {
      if( card.el.id === lugarName ){
        this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
        this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
      }else{
        // resto de elementos quedarán deseleccionados
        this.renderer.setStyle( card.el, "background", "" );
        this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
      }
    });
  }

  private async loadLugares(){
    return new Promise( (resolve) => {
      this.partidoService.getPartidosAsDoc()
      .then( (docList : QuerySnapshot<DocumentData>) => {
        this.lugares = new Set<string>();
        for( let docSnap of docList.docs ){
          // skip "Polideportivo Laguna" manually
          if( docSnap.data().ubicacion &&
              docSnap.data().ubicacion !== "Polideportivo Laguna" )
            this.lugares.add( docSnap.data().ubicacion );
        }
        resolve( null );
      });
    } );
  }

  public getEquipoName(){
    return this.crearComponent.equipoName;
  }

  public getRivalName(){
    return this.crearComponent.rivalName;
  }

  public onSelectedHome( ){
    this.lugarSelected = 'Polideportivo Laguna';
    this.crearComponent.setLugar( this.lugarSelected );
    this.resultCards.forEach( (card) => {
      this.renderer.setStyle( card.el, "background", "" );
      this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
    });
  }

  public onLugarSelected( lugar : string ) {
    this.crearComponent.setLugar( lugar );
    this.router.navigate( ['..', 'info'], { relativeTo: this.route } );
  }

}




