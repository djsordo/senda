import { Component, 
  OnInit, 
  QueryList, 
  Renderer2, 
  ViewChildren } from '@angular/core';
import { Db } from '../../../services/db.service';
import { Jugador } from '../../../modelo/jugador';
import { AdminJugadoresPage } from '../admin-jugadores.page';



@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent  implements OnInit {

  @ViewChildren('resultCard') resultCards: QueryList<any>;
  public jugadorList : Jugador[];
  currentId : string; 

  constructor( private db: Db,
               private renderer: Renderer2, 
               private mainPage : AdminJugadoresPage
   ) { }

  ngOnInit() {
    this.db.getJugador()
      .then( (jugadorList : Jugador[] ) => {
        this.jugadorList = jugadorList;
      } );
  }

  public onCardSelected( element : {id: string} ) {
    console.log( element );
    this.resultCards.forEach( (card) => {
      if( card.el.id === element.id ){
        if( card.el.id !== this.currentId ){
          this.renderer.setStyle( card.el, "background", "var(--ion-color-primary)" );
          this.renderer.setStyle( card.el, "color", "var(--ion-color-dark)" );
          this.currentId = card.el.id;
        }else{
          // simulamos el efecto de que un click en un elemento 
          // seleccionado, deja la selección sin efecto
          this.renderer.setStyle( card.el, "background", "" );
          this.renderer.setStyle( card.el, "color", "rgb( 115, 115, 115)" );
          this.currentId = null;
        }
      }
      else
        this.renderer.setStyle( card.el, "background", "" );
    });
  }

  public onClickBorrar(){
    console.log("borrar clicked");
    console.log("currentId:", this.currentId);
  }


}
