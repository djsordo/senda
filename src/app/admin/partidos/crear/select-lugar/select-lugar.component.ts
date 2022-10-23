import { Component, OnInit, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { DocumentData, 
  QuerySnapshot} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from "@angular/router";


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
  lugarName : string;
  

  public constructor( private partidoService : PartidosService, 
                      private renderer : Renderer2, 
                      private router : Router, 
                      private route : ActivatedRoute,
                      private crearComponent : CrearComponent ){

  }

  public ngOnInit(): void {
    this.loadLugares();
  }

  private async loadLugares(){
    this.partidoService.getPartidosAsDoc()
      .then( (docList : QuerySnapshot<DocumentData>) => {
        this.lugares = new Set<string>();
        for( let docSnap of docList.docs ){
          // skip "Polideportivo Laguna" manually
          if( docSnap.data().ubicacion &&
              docSnap.data().ubicacion !== "Polideportivo Laguna" )
            this.lugares.add( docSnap.data().ubicacion );
        }
      });
  }

  public getEquipoName(){
    return this.crearComponent.equipoName;
  }

  public getRivalName(){
    return this.crearComponent.rivalName;
  }

  public onSelectedHome( ){
    this.lugarSelected = 'Polideportivo Laguna';
    this.resultCards.forEach( (card) => {
      this.renderer.setStyle( card.el, "background", "" );
      this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
    });
  }

  public onLugarSelected( lugar : string ) {
    this.lugarName = '';
    this.resultCards.forEach( (card) => {
      if( card.el.id === lugar ){
        if( card.el.id !== this.lugarSelected ){
          this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
          this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
          this.lugarSelected = lugar;
        }else{
          // simulamos el efecto de que un click 
          // en un elemento seleccionado, deja sin 
          // efecto la selección 
          this.renderer.setStyle( card.el, "background", "" );
          this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
          this.lugarSelected = null;
        }
      }else{
        // resto de elementos quedarán seleccionados
        this.renderer.setStyle( card.el, "background", "" );
        this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
      }
    });
    console.log( this.lugarSelected );
    this.crearComponent.setLugar( this.lugarSelected );
    this.router.navigate( ['..', 'info'], { relativeTo: this.route } );
  }

}




