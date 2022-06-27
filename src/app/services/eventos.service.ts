import { Injectable  } from "@angular/core";

import { Accion, TipoAccion } from '../modelo/accion';
import { Evento } from '../modelo/evento';


@Injectable({
  providedIn : 'root'
})
export class EventosService {

  acciones : Array<Accion>;
  eventos : Array<Evento>;

  constructor() {
    this.acciones = [
      { id: 'parada', 
        alias: ['parada', 'paradón'], 
        positivo: TipoAccion.positivo }, 
      { id: 'gol_rival', 
        alias: ['gol rival', 'gol del rival'], 
        positivo: TipoAccion.negativo }, 
      { id: 'gol', 
        alias: ['gol', 'golazo', 'tanto'], 
        positivo: TipoAccion.positivo }, 
      { id: 'tiro', 
        alias: ['tiro', 'tiro a puerta'], 
        positivo: TipoAccion.positivo },
      { id: 'perdida', 
        alias: ['pérdida'], 
        positivo: TipoAccion.negativo }, 
      { id: 'robo', 
        alias: ['robo', 'robada'], 
        positivo: TipoAccion.positivo },
      { id: 'cambio',  
        alias: ['cambio', 'se cambia', 'se cambia por'], 
        positivo: TipoAccion.neutro },
      { id: '2_minutos', 
        alias: ['dos minutos', '2 minutos'], 
        positivo: TipoAccion.negativo },
      { id: 'tarjeta_amarilla',  
        alias: ['tarjeta amarilla', 'amarilla'], 
        positivo: TipoAccion.negativo },
      { id: 'tarjeta_roja', 
        alias: ['tarjeta roja', 'roja'], 
        positivo: TipoAccion.negativo },
      { id: 'tarjeta_azul', 
        alias: ['tarjeta azul', 'azul'], 
        positivo: TipoAccion.negativo }
    ];
  }

  public getAcciones( ){
    return this.acciones;
  }

  public addEvento( evento : Evento ){
    this.eventos.push( evento );
  }

}

