import { Injectable } from '@angular/core';

import { Jugador } from '../../modelo/jugador';
import { JugadoresService } from 'src/app/services/jugadores.service';

import { Accion } from '../../modelo/accion';
import { EventosService } from '../../services/eventos.service';

import { CronoService } from '../crono/crono.service';

import { Evento } from '../../modelo/evento';


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

  /**
   * 
   * @param sentence la frase a ser identificada
   * @returns objeto evento reconocido o null si no ha identifiado nada
   */
  public parseSentence( sentence: string ){
    let eventParsed = this.eventosService.newEvento();
    if( this.parseSimpleSentence( sentence, eventParsed ) )
      return eventParsed; 
    else
      return null;
  }

  /**
   * Ejemplos de una frase sencilla: 
   * - "gol de cesar"
   * - "paradón de vaquero"
   * @param sentence 
   * @param eventParsed 
   * @returns 
   */
  private parseSimpleSentence( sentence : string, eventParsed : Evento ){
    let words = sentence.split(' ');
    words = words.map( (x) => { return x.toLowerCase(); } );

    return this.parseAccion( words, eventParsed )
       && this.parseOptionalPreposition( words, eventParsed )
       && this.parseJugador( words, eventParsed );
  }

  private parseAccion( sentenceAsWords : string[], eventParsed : Evento ){
    for( let accion of this.acciones ){
      for( let alias_accion of accion.alias ) {
        let aliasAsWords = alias_accion.split(' ');
        if( this.beginsWith( sentenceAsWords, aliasAsWords ) ){
          eventParsed.accion = accion;
          sentenceAsWords.splice( 0, aliasAsWords.length );
          return true;
        }
      }
    }
    return false;
  }

  private parseJugador( sentenceAsWords : string[], eventParsed : Evento ){
    let result = false;
    if( sentenceAsWords.length > 1 ) {
      // intentaremos identificar un nombre especificado como nombre y apellido
      // (gol de cesar vitores)
      let jugadorEncontrado;
      if( (jugadorEncontrado = this.encontradoUnJugador( sentenceAsWords.slice(0,2) ) ) ){
        sentenceAsWords.splice(0, 2); 
        eventParsed.jugador = jugadorEncontrado;
        result = true;
      }
    }
    if( !result && sentenceAsWords.length > 0 ){
      // intentaremos identificar un nombre especificado como nombre 
      // (gol de santi)
      let jugadorEncontrado;
      if( (jugadorEncontrado = this.encontradoUnJugador( [sentenceAsWords[0]] ) ) ){
        sentenceAsWords.splice(0, 1); 
        eventParsed.jugador = jugadorEncontrado;
        result = true;
      }
    }
    return result;
  }

  private encontradoUnJugador( possibleName : string[] ){
    let jugadoresParsed = [];
    for( let jugador of this.jugadores ){
      if( this.parseUnJugador( possibleName, jugador ) ){
        jugadoresParsed.push( jugador ); 
      }
    }
    if( jugadoresParsed.length === 1 ){
      return jugadoresParsed[0];
    }
    return null;
  }

  private parseUnJugador( possibleName : string[], jugador : Jugador ){
    let regExp = new RegExp( '.*' + possibleName.join('.*') + '.*', 'i' );
    return jugador.numero.match( regExp ) 
     || jugador?.nombre.match( regExp )
     || jugador?.posicion.match( regExp );
  }

  private parseOptionalPreposition( sentenceAsWords : string[], eventParsed : object ){
    if( sentenceAsWords.length > 0 
      && this.preposicion.find( ( elem ) => { return elem === sentenceAsWords[0]; } ) ) { 
        sentenceAsWords.splice(0, 1);
        // repeat until nothing is done 
        this.parseOptionalPreposition( sentenceAsWords, eventParsed );
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

