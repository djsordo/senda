import { Injectable  } from '@angular/core';

import { CronoService } from '../components/crono/crono.service';
import { Evento } from '../modelo/evento';


export enum Acciones {
  parada = 'accion.parada',
  golRival = 'accion.gol_rival',
  lanzamiento = 'accion.lanzamiento',
  gol = 'accion.gol',
  tiro = 'accion.tiro',
  perdida = 'accion.perdida',
  robo = 'accion.robo',
  cambio = 'accion.cambio',
  dosMinutos = 'accion.2_minutos',
  tarjetaAmarilla = 'accion.tarjeta_amarilla',
  tarjetaRoja = 'accion.tarjeta_roja',
  tarjetaAzul = 'accion.tarjeta_azul',
  entra = 'accion.entra',
  sale = 'accion.sale'
}

@Injectable({
  providedIn : 'root'
})
export class EventosService {

  acciones: Acciones[];
  eventos: Evento[];

  constructor( private cronoService: CronoService ) {
    this.acciones =
    [ Acciones.parada,
      Acciones.golRival,
      Acciones.gol,
      Acciones.tiro,
      Acciones.perdida,
      Acciones.robo,
      Acciones.cambio,
      Acciones.dosMinutos,
      Acciones.tarjetaAmarilla,
      Acciones.tarjetaRoja,
      Acciones.tarjetaAzul,
      Acciones.entra,
      Acciones.sale ];
  }

  public getAcciones( ): Acciones[] {
    return this.acciones;
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

  public addEvento( evento: Evento ){
    this.eventos.push( evento );
  }

}



