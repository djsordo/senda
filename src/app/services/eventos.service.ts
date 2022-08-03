import { Injectable  } from '@angular/core';

import { CronoService } from '../components/crono/crono.service';
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
  tarjeta_azul = 'accion.tarjeta_azul',
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
      Acciones.gol_rival,
      Acciones.gol,
      Acciones.tiro,
      Acciones.perdida,
      Acciones.robo,
      Acciones.cambio,
      Acciones.dos_minutos,
      Acciones.tarjeta_amarilla,
      Acciones.tarjeta_roja,
      Acciones.tarjeta_azul,
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



