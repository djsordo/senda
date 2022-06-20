import { Injectable  } from "@angular/core";

@Injectable({
  providedIn : 'root'
})
export class EventosService {

  prototiposEventos : Array<EventoPrototipo>;
  eventos : Array<Evento>;

  constructor() {
    this.prototiposEventos = [
      { id: 'parada', positivo: TipoEvento.positivo }, 
      { id: 'gol_rival', positivo: TipoEvento.negativo }, 
      { id: 'gol', positivo: TipoEvento.positivo }, 
      { id: 'tiro', positivo: TipoEvento.positivo },
      { id: 'perdida', positivo: TipoEvento.negativo }, 
      { id: 'robo', positivo: TipoEvento.positivo },
      { id: 'cambio',  positivo: TipoEvento.neutro },
      { id: '2_minutos', positivo: TipoEvento.negativo },
      { id: 'tarjeta_amarilla',  positivo: TipoEvento.negativo },
      { id: 'tarjeta_roja',  positivo: TipoEvento.negativo },
      { id: 'tarjeta_azul', positivo: TipoEvento.negativo }
    ];
  }

  public getAllEventosPrototipos( ){
    return this.prototiposEventos;
  }

  public addEvento( evento : Evento ){
    this.eventos.push( evento );
  }

}

