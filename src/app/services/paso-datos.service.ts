
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Evento } from '../modelo/evento';

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
  private datosPantalla : any = {};
  public eventoJugador = new Subject<Evento>();

  constructor() {}

  suscribirmeAEventoJugador( callback : (data : Evento) => void ){
    console.log('suscripcion a eventojugador');
    return this.eventoJugador.subscribe({ next: callback });
  }

  onEventoJugador( evento : Evento ){
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
  setPantalla(url : string, datos: any){
    this.datosPantalla[url] = datos;
  }

  getPantalla( url: string ){
    return this.datosPantalla[url];
  }

  isPantalla( url: string ){
    return url in this.datosPantalla;
  }

}
