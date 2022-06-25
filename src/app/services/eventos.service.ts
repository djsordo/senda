import { Injectable  } from "@angular/core";

import { Accion, TipoAccion } from '../modelo/accion';
import { Evento } from '../modelo/evento';


@Injectable({
  providedIn : 'root'
})
export class EventosService {

  prototiposEventos : Array<Accion>;
  eventos : Array<Evento>;

  constructor() {
    this.prototiposEventos = [
      { id: 'parada', positivo: TipoAccion.positivo }, 
      { id: 'gol_rival', positivo: TipoAccion.negativo }, 
      { id: 'gol', positivo: TipoAccion.positivo }, 
      { id: 'tiro', positivo: TipoAccion.positivo },
      { id: 'perdida', positivo: TipoAccion.negativo }, 
      { id: 'robo', positivo: TipoAccion.positivo },
      { id: 'cambio',  positivo: TipoAccion.neutro },
      { id: '2_minutos', positivo: TipoAccion.negativo },
      { id: 'tarjeta_amarilla',  positivo: TipoAccion.negativo },
      { id: 'tarjeta_roja',  positivo: TipoAccion.negativo },
      { id: 'tarjeta_azul', positivo: TipoAccion.negativo }
    ];
  }

  public getAllEventosPrototipos( ){
    return this.prototiposEventos;
  }

  public addEvento( evento : Evento ){
    this.eventos.push( evento );
  }

}

