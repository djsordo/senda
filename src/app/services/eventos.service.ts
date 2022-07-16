import { Injectable  } from "@angular/core";

import { CronoService } from "../components/crono/crono.service";
import { Accion, TipoAccion } from '../modelo/accion';
import { Evento } from '../modelo/evento';


export enum Acciones {
  parada = 'accion.parada', 
  gol_rival = 'accion.gol_rival',
  lanzamiento = 'accion.lanzamiento',
  gol = 'accion.gol', 
  tiro = 'accion.tiro',
  perdida = 'accion.perdida',
  robo = 'accion.robo', 
  cambio = 'accion.cambio', 
  dos_minutos = 'accion.2_minutos', 
  tarjeta_amarilla = 'accion.tarjeta_amarilla', 
  tarjeta_roja = 'accion.tarjeta_roja', 
  tarjeta_azul = 'accion.tarjeta_azul'
}

@Injectable({
  providedIn : 'root'
})
export class EventosService {

  acciones : Array<Accion>;
  eventos : Array<Evento>;

  constructor( private cronoService : CronoService ) {
    this.acciones = [
      { id: Acciones.parada, 
        alias: ['parada', 'paradón'], 
        positivo: TipoAccion.positivo }, 
      { id: Acciones.gol_rival, 
        alias: ['gol rival', 'gol del rival'], 
        positivo: TipoAccion.negativo }, 
      { id: Acciones.gol, 
        alias: ['gol', 'golazo', 'tanto'], 
        positivo: TipoAccion.positivo }, 
      { id: Acciones.tiro, 
        alias: ['tiro', 'tiro a puerta'], 
        positivo: TipoAccion.positivo },
      { id: Acciones.perdida, 
        alias: ['pérdida'], 
        positivo: TipoAccion.negativo }, 
      { id: Acciones.robo, 
        alias: ['robo', 'robada'], 
        positivo: TipoAccion.positivo },
      { id: Acciones.cambio,  
        alias: ['cambio', 'se cambia', 'se cambia por'], 
        positivo: TipoAccion.neutro },
      { id: Acciones.dos_minutos, 
        alias: ['dos minutos', '2 minutos'], 
        positivo: TipoAccion.negativo },
      { id: Acciones.tarjeta_amarilla,  
        alias: ['tarjeta amarilla', 'amarilla'], 
        positivo: TipoAccion.negativo },
      { id: Acciones.tarjeta_roja, 
        alias: ['tarjeta roja', 'roja'], 
        positivo: TipoAccion.negativo },
      { id: Acciones.tarjeta_azul, 
        alias: ['tarjeta azul', 'azul'], 
        positivo: TipoAccion.negativo }
    ];
  }

  public getAcciones( ){
    return this.acciones;
  }

  public getAccionById( idAccion : Acciones ) {
    for( let accion of this.acciones ){
      if( accion.id === idAccion )
        return accion;
    }
    return null;
  }

  /**
   * Devuelve un evento nuevo. 
   */
  public newEvento(){
    return {  id : '',
        timestamp : new Date(),
        jugador : null,
        accion : null,
        crono : this.cronoService.marcaTiempo() } as Evento;
  }

  public addEvento( evento : Evento ){
    this.eventos.push( evento );
  }

}



