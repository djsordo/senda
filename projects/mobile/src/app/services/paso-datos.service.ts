
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Evento } from '../modelo/evento';
import { EstadJugador } from '../modelo/estadJugador';
import { LocalStorageProvider, LocalStorageService } from './local.storage.service';

@Injectable({
  providedIn: 'root'
})
export class PasoDatosService {
  public listaExcluidos: Array<EstadJugador>;
  public listaEliminados: Array<EstadJugador>;
  public listaInicial: any;
  public listaBanquillo: any;
  public jugCampo: any; 
  public portero: any;
  private equipoId: string;
  private nombresEquipos: {
    casa: string;
    fuera: string;
  };

  private datosPantalla: any = {};
  public eventoJugador = new Subject<Evento>();

  constructor( ) {
  }

  suscribirmeAEventoJugador( callback: (data: Evento) => void ){
    return this.eventoJugador.subscribe({ next: callback });
  }

  onEventoJugador( evento: Evento ){
    this.eventoJugador.next( evento );
  }

  setListaInicial(datos: any){
    this.listaInicial = datos;
  }

  getListaInicial() {
    return this.listaInicial;
  }

  setJugCampo( datos: any ){
    this.jugCampo = datos; 
  }

  getJugCampo(){
    return this.jugCampo;
  }

  setPortero( datos: any ) {
    this.portero = datos; 
  }

  getPortero() {
    return this.portero; 
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
