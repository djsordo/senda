import { Directive } from "@angular/core";
import { AbstractControl, 
      AsyncValidator, 
      NG_ASYNC_VALIDATORS, 
      ValidationErrors } from "@angular/forms";
import { EMPTY, Observable } from "rxjs";

import { Db } from "../../services/db.service";
import { where } from "@angular/fire/firestore";
import { EditarComponent } from "./editar/editar.component";

@Directive({
  selector: '[numeroJugadorExiste]',
  standalone: true, 
  providers: [{
    provide: NG_ASYNC_VALIDATORS, 
    useExisting: NumeroJugadorExisteValidatorDirective, 
    multi: true
    },
    Db]
})
export class NumeroJugadorExisteValidatorDirective implements AsyncValidator {

  constructor( private db: Db, 
    private editarJugador : EditarComponent
   ){
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> |
                                      Observable<ValidationErrors | null> {
    if( control.value ){
      let numberAsZeroPaddedString = control.value.toString().padStart(2,'0');
      return new Observable( (subscriber) => {
        this.db.getJugador( where( "numero", "==", numberAsZeroPaddedString ) )
          .then( (jugadores) => {
            if( jugadores.length != 0 ){
              // si sólo encuentro un jugador con ese número y ese el mío...
              if( jugadores.length === 1 
                && jugadores[0].id === this.editarJugador.getJugadorId() ){
                // entonces no hay error
                subscriber.next(null);                  
              }else
                subscriber.next( {
                  "error": `Found a player with this number: ${jugadores[0]}`
                } );
            }else{
              subscriber.next( null );
            }
            subscriber.complete();
          })
      })  
    }else{
      return EMPTY;
    }
  }

}


