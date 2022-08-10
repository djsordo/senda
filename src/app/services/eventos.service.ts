import { Injectable  } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { CronoService } from '../components/crono/crono.service';
import { Evento } from '../modelo/evento';


export enum Acciones {
  parada = 'accion.parada',
  golRival = 'accion.golRival',
  lanzamiento = 'accion.lanzamiento',
  gol = 'accion.gol',
  tiro = 'accion.tiro',
  perdida = 'accion.perdida',
  robo = 'accion.robo',
  cambio = 'accion.cambio',
  dosMinutos = 'accion.2Minutos',
  dosMinutosRival = 'accion.2MinutosRival',
  tarjetaAmarilla = 'accion.tarjetaAmarilla',
  tarjetaRoja = 'accion.tarjetaRoja',
  tarjetaAzul = 'accion.tarjetaAzul',
  entra = 'accion.entra',
  sale = 'accion.sale',
  titular = 'accion.titular',
  banquillo = 'accion.banquillo',
  noConvocado = 'accion.noConvocado',
  tm = 'accion.tiempoMuerto',
  tmRival = 'accion.tiempoMuertoRival'
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
      Acciones.dosMinutosRival,
      Acciones.tarjetaAmarilla,
      Acciones.tarjetaRoja,
      Acciones.tarjetaAzul,
      Acciones.entra,
      Acciones.sale,
      Acciones.titular,
      Acciones.banquillo,
      Acciones.noConvocado,
      Acciones.tm,
      Acciones.tmRival ];
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
      creadorEvento: null,
      accionPrincipal: null,
      accionSecundaria: null,
    } as Evento;
  }

  public addEvento( evento: Evento ){
    this.eventos.push( evento );
  }

  getEventos(){
    return this.eventos;
  }
  // BASE DE DATOS
  async addEventoBD(evento: Evento){
    const eventoRef = collection(this.firestore, 'eventos');
    return await addDoc(eventoRef, evento);
  }
}



