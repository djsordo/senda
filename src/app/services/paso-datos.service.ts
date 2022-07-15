
import { Injectable } from '@angular/core';
/* import { BehaviorSubject } from 'rxjs'; */

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

  constructor() {}

/*   enviaListaInicial(datos: any){
    this.listaInicial.next(datos);
  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo.next(datos);
  } */
  setListaInicial(datos: any){
    this.listaInicial = datos;
    /* console.log('lista Inicial: ', this.listaInicial); */
  }

  getListaInicial(){
    return this.listaInicial;
  }

  setListaBanquillo(datos: any){
    this.listaBanquillo = datos;
    /* console.log('Banquillo: ', this.listaBanquillo); */
  }

  getListaBanquillo(){
    return this.listaBanquillo;
  }

  setPantalla(url : string, datos: any){
    this.datosPantalla[url] = datos;
  }

  getPantalla( url: string ){
    return this.datosPantalla[url];
  }

}
