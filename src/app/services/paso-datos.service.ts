
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

  listaInicial: any;
  listaBanquillo: any;
  pantallaDetalle: any;

  constructor() {}

/*   enviaListaInicial(datos: any){
    this.listaInicial.next(datos);
  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo.next(datos);
  } */
  enviaListaInicial(datos: any){
    this.listaInicial = datos;
    /* console.log('lista Inicial: ', this.listaInicial); */

  }

  enviaListaBanquillo(datos: any){
    this.listaBanquillo = datos;
    /* console.log('Banquillo: ', this.listaBanquillo); */
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
