/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasoDatosService {
  private listaInicial = new BehaviorSubject<[]>([]);
  private listaBanquillo = new BehaviorSubject<[]>([]);

  $getListaInicial = this.listaInicial.asObservable();
  $getListaBanquillo = this.listaBanquillo.asObservable();

  pantallaDetalle: any;

  constructor() {}

  enviaListaInicial(datos: any){
    this.listaInicial.next(datos);
  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo.next(datos);
  }

  enviaPantallaDetalle(datos: any){
    return this.pantallaDetalle = datos;
  }

  getPantallaDetalle(){
    return this.pantallaDetalle;
  }

}
