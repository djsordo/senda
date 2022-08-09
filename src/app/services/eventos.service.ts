import { Injectable  } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
  sale = 'accion.sale',
  titular = 'accion.titular',
  banquillo = 'accion.banquillo',
  noConvocado = 'accion.noConvocado'
}

@Injectable({
  providedIn : 'root'
})
export class EventosService {

  acciones: Acciones[];
  eventos: Evento[];

  constructor( private cronoService: CronoService, private firestore: Firestore ) {
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
      Acciones.sale,
      Acciones.titular,
      Acciones.banquillo,
      Acciones.noConvocado ];
  }

  public getAcciones( ): Acciones[] {
    return this.acciones;
  }

  /**
   * Devuelve un evento nuevo.
   */
  public newEvento(){
    return {
      id : '',
      partidoId: null,
      equipoId: null,
      jugadorId: null,
      posicionCampo: null,
      posicionPorteria: null,
      timestamp: new Date(),
      crono: this.cronoService.marcaTiempo(),
      jugador: null,
      accionPrincipal: null,
      accionSecundaria: null,
    } as Evento;
  }

  public addEvento( evento: Evento ){
    this.eventos.push( evento );
  }

  // BASE DE DATOS
  addEventoBD(evento: Evento){
    const eventoRef = collection(this.firestore, 'eventos');
    return addDoc(eventoRef, evento);
  }
}



