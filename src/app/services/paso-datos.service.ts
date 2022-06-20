/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasoDatosService {
/*   private listaInicial = new BehaviorSubject<[]>([]);
  private listaBanquillo = new BehaviorSubject<[]>([]); */

  listaInicial: any;
  listaBanquillo: any;

  /* $getListaInicial = this.listaInicial.asObservable();
  $getListaBanquillo = this.listaBanquillo.asObservable();
 */
  constructor() {
    console.log('Constructor del servicio');
  }

  enviaListaInicial(datos: any){
    this.listaInicial = datos;
  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo = datos;
  }

  getListaInicial(){
    return this.listaInicial;
  }

  getListaBanquillo(){
    return this.listaBanquillo;
  }

}
