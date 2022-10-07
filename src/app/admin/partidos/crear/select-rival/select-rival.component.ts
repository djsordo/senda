import { Component, Input, OnInit, QueryList, Renderer2, ViewChildren } from "@angular/core";
import { DocumentData, 
  QueryDocumentSnapshot, 
  QuerySnapshot} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from "@angular/router";


import { PartidosService } from "src/app/services/partidos.service";

@Component({
  selector: 'select-rival', 
  templateUrl : './select-rival.component.html',
  styleUrls : [ './select-rival.component.scss' ]
})
export class SelectRivalComponent implements OnInit {

  @ViewChildren('resultCard') resultCards : QueryList<any>;
  _rivalName : string;
  rivales : Set<string>;

  constructor( private partidoService : PartidosService,
               private renderer : Renderer2, 
               private router : Router,
               private route : ActivatedRoute ){

  }

  ngOnInit(): void {
    this.loadRivales();
  }

  public set rivalName( rivalName : string ){
    this._rivalName = rivalName;
    // paint the cards again (don't use onRivalSelected
    // for this job, because if you type the exact value
    // of a card, it doesn't work)
    this.resultCards.forEach( (card) => {
      if( card.el.id === this._rivalName ){
        this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
        this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
      }else{
        // resto de elementos quedarán seleccionados
        this.renderer.setStyle( card.el, "background", "" );
        this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
      }
    });
  }

  public get rivalName(){
    return this._rivalName;
  }

  private async loadRivales(){
    this.partidoService.getPartidosAsDoc()
      .then( (docList : QuerySnapshot<DocumentData>) => {
        this.rivales = new Set<string>();
        for( let docSnap of docList.docs ){
          this.rivales.add( docSnap.data().rival );
        }
      });
  }

  public onRivalSelected( rival ){
    this.resultCards.forEach( (card) => {
      if( card.el.id === rival ){
        if( card.el.id !== this._rivalName ){
          this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
          this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
          this._rivalName = rival;
        }else{
          // simulamos el efecto de que un click 
          // en un elemento seleccionado, deja sin 
          // efecto la selección 
          this.renderer.setStyle( card.el, "background", "" );
          this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
          this._rivalName = null;
        }
      }else{
        // resto de elementos quedarán seleccionados
        this.renderer.setStyle( card.el, "background", "" );
        this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
      }
    });
    console.log( this._rivalName );
    this.router.navigate( ['..', 'lugar'], { relativeTo: this.route } );
  }

}



