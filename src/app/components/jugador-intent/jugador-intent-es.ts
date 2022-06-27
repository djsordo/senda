import { Injectable } from '@angular/core';

import { Jugador } from '../../modelo/jugador';
import { JugadoresService } from 'src/app/services/jugadores.service';

import { Accion } from '../../modelo/accion';
import { EventosService } from '../../services/eventos.service';

/**
 * aquí tenemos que registrar cosicas como: 
 * 
 * "gol de nombre-jugador"
 * "tiro de nombre-jugador"
 * "gol de nombre-jugador desde area central a zona1"
 * "fallo de nombre-jugador, se sale por el area..."
 * "fallo de nombre-jugador"
 * "parada de nombre-portero"
 * "robo de nombre-jugador"
 * "dos minutos de nombre-jugador"
 * "[tarjeta] roja para nombre-jugador"
 * "[tarjeta] amarilla para nombre-jugador"
 * "[tarjeta] azul para nombre-jugador"
 * 
 */
@Injectable({
  providedIn : 'root'
})
export class JugadorIntentEs{

  private acciones : Accion[];
  private preposicion = ["a", "con", "de", "desde", "en", "por" ];
  private jugadores : Jugador[];
  private intent1 : object[];
  private allIntents : object[];

  constructor( private eventosService : EventosService,
               private jugadoresService : JugadoresService ){
    this.acciones = this.eventosService.getAcciones();
    this.jugadores = this.jugadoresService.getJugadores();

    // this.intent1 = [ this.acciones, 
    //   this.preposicion, 
    //   this.jugador ];
    // this.allIntents = [ this.intent1 ];
  }

  public parseIntent( sentence : string ){
    // TODO: IR CREANDO UNA ESTRUCTURA DE DATOS 
    // CON EL CONTENIDO PARSEADO
    let words = sentence.split(' ');
    let result1 = this.parseAccion( words )
    let result2 = this.parseOptionalPreposition( words );
    let result3 = this.parseCualquierJugador( words );

    console.log( result1 );
    console.log( result2 );
    console.log( result3 );
    console.log( words );
    return true;
  }

  private parseAccion( sentenceAsWords : string[] ){
    for( let accion of this.acciones ){
      for( let alias_accion of accion.alias ) {
        let aliasAsWords = alias_accion.split(' ');
        if( this.beginsWith( sentenceAsWords, aliasAsWords ) ){
          sentenceAsWords.splice( 0, aliasAsWords.length );
          return true;
        }
      }
    }
    return false;
  }

  private parseCualquierJugador( sentenceAsWords : string[] ){
    for( let jugador of this.jugadores ){
      if( this.parseUnJugador( sentenceAsWords, jugador ) ){
        return true; 
      }
    }
    return false;
  }

  private parseUnJugador( sentenceAsWords : string[], jugador : Jugador ){
    let twoWords = sentenceAsWords[0] 
          + ' ' 
          + sentenceAsWords[1];
    if( twoWords === jugador.numero 
      || twoWords.includes( jugador.nombre )
      || twoWords.includes( jugador.posicion ) ){
        sentenceAsWords.splice( 0, 2 );
        return true;
      }
    let firstWord = sentenceAsWords[0]; 
    if( firstWord === jugador.numero 
      || firstWord.includes( jugador.nombre )
      || firstWord.includes( jugador.posicion ) ){
        sentenceAsWords.splice( 0, 1 );
        return true;
      }
  }

  private parseOptionalPreposition( sentenceAsWords : string[] ){
    if( sentenceAsWords.length > 0 
      && this.preposicion.find( ( elem ) => { return elem === sentenceAsWords[0]; } ) ) { 
        sentenceAsWords.splice(0, 1);
        // repeat until nothing is done 
        this.parseOptionalPreposition( sentenceAsWords );
    }
    return true;
  }

  private beginsWith( a1 : string[], a2 : string[] ) {
    if( a1.length < a2.length ){
      return false;
    }else{
      for( let index in a2 ){
        if( a1[index] !== a2[index] )
          return false;
      }
      return true;
    }
  } 

}

