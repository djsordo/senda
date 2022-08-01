
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StringDecoder } from 'string_decoder';

import { Evento } from '../modelo/evento';
import { Jugador } from '../modelo/jugador';

@Injectable({
  providedIn: 'root'
})
export class PasoDatosService {
  /* private listaInicial = new BehaviorSubject<[]>([]);
  private listaBanquillo = new BehaviorSubject<[]>([]);

  $getListaInicial = this.listaInicial.asObservable();
  $getListaBanquillo = this.listaBanquillo.asObservable(); */

  private listaInicial: any;
  private listaBanquillo: any;
  private equipoId: string;
  private nombresEquipos: {
    casa: string;
    fuera: string;
  };

  private datosPantalla: any = {};
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public eventoJugador = new Subject<Evento>();

  constructor() {}

  suscribirmeAEventoJugador( callback: (data: Evento) => void ){
    return this.eventoJugador.subscribe({ next: callback });
  }

  onEventoJugador( evento: Evento ){
    this.eventoJugador.next( evento );
  }

/*   enviaListaInicial(datos: any){
    this.listaInicial.next(datos);
  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo.next(datos);
  } */

  setListaInicial(datos: any){
    this.listaInicial = datos;
  }

  getListaInicial(){
    return this.listaInicial;
  }

  setListaBanquillo(datos: any){
    this.listaBanquillo = datos;
  }

  getListaBanquillo(){
    return this.listaBanquillo;
  }

  setEquipoId(datos: any){
    this.equipoId = datos;
  }

  getEquipoId(){
    return this.equipoId;
  }

  setNombresEquipos(datos: any){
    this.nombresEquipos = datos;
  }

  getNombresEquipos(){
    return this.nombresEquipos;
  }
  /**
   * Paso de datos entre pantallas.
   *
   * Mediante esta llamada se puede indicar un valor de pantalla
   * y un objeto que se puede pasar a otra pantalla, que lo recogerá
   * a su vez mediante getPantalla.
   *
   * @param url
   * @param datos
   */
  setPantalla(url: string, datos: any){
    this.datosPantalla[url] = datos;
  }

  getPantalla( url: string ){
    return this.datosPantalla[url];
  }

  isPantalla( url: string ){
    return url in this.datosPantalla;
  }

}
