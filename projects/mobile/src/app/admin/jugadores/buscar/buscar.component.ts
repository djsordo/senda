import { Component, 
  OnInit, 
  QueryList, 
  Renderer2, 
  ViewChildren } from '@angular/core';
import { Db } from '../../../services/db.service';
import { Jugador } from '../../../modelo/jugador';
import { AdminJugadoresPage } from '../admin-jugadores.page';
import { ToastService } from '../../../services/toast.service';
import { StringUtil } from '../../../services/string-util';



@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent  implements OnInit {

  @ViewChildren('resultCard') resultCards: QueryList<any>;
  public jugadorList : Jugador[];
  currentId : string; 
  searchText : string = '';

  constructor( private db: Db,
               private toastService : ToastService,
               private stringUtil : StringUtil,
               private renderer: Renderer2 ) { }

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

  public onKeyPress( event: any ){
    console.log( event );
  }

  public onClickSearch() {
    this.refreshJugadoresList();
  }

  private refreshJugadoresList() {
    this.db.getJugador()
      .then( (jugadorList : Jugador[] ) => {
        this.jugadorList = [];
        for( let jugador of jugadorList ){
          try{
            if( this.matchesSearch( jugador, this.searchText ) ){
              this.jugadorList.push( jugador );
            }
          }catch( err ){
            console.error( 'Error in refreshJugadoresList' );
            console.error( err );
          }
        }
      } );
  }

  private matchesSearch( jugador: Jugador, searchText: string ) : boolean {
    const composedInfo = jugador.nombre + ' ' 
                + jugador.numero;
    if( searchText ) 
      return this.stringUtil.like( composedInfo, searchText );
    else
      return true;
  }

  public onClickBorrar(){
    this.db.delJugador( this.currentId )
    .then( _ => this.toastService.sendToast( "Jugador borrado correctamente" ) )
    .catch( _ => this.toastService.sendToast( "Se ha producido un error al borrar al jugador, vuelva a intentarlo más tarde" ) );
  }


}
