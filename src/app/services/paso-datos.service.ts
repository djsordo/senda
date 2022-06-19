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

  enviaListaInicial(datos: any){
    this.listaInicial.next(datos);
  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo.next(datos);
  }

  constructor() { }
}
