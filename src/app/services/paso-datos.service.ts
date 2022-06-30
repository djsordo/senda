import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasoDatosService {

  listaInicial: any;
  listaBanquillo: any;

  pantallaDetalle: any;

  constructor() {
    console.log('Constructor del servicio');
  }

  enviaListaInicial(datos: any){
    this.listaInicial = datos;
    console.log('lista Inicial: ', this.listaInicial);

  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo = datos;
    console.log('Banquillo: ', this.listaBanquillo);
  }

  getListaInicial(){
    return this.listaInicial;
  }

  getListaBanquillo(){
    return this.listaBanquillo;
  }

  enviaPantallaDetalle(datos: any){
    return this.pantallaDetalle = datos;
  }

  getPantallaDetalle(){
    return this.pantallaDetalle;
  }

}
