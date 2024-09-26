import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { CronoData } from 'projects/mobile/src/app/modelo/cronoData';

export interface Tick {
  segundos: number;
}

@Injectable({
  providedIn: 'any'
})
export class CronoService {

  partes: number;
  segsParte: number;

  tiempo: CronoData = {
    encendido: false,
    finParte: false,
    finPartido: false,
    parte: 1,
    segundos: 0
  };

  // Observable que de un tick cada segundo cuando el crono está encendido
  private tickObservablePrivate: BehaviorSubject<Tick> = new BehaviorSubject<Tick>({segundos: 0});

  constructor( ) { 
    console.log("paso por constructor de crono");
  }

  get tickObservable(){
    return this.tickObservablePrivate.asObservable();
  }

  set tickObservableData(data: Tick){
    this.tickObservablePrivate.next(data);
  }

  esInicioPartido() : boolean {
    return this.tiempo.segundos === 0 && this.tiempo.parte === 1;
  }

  esFinalPartido() : boolean {
    return this.tiempo.parte == this.partes;
  }

  esComienzoDeParte() : boolean {
    return this.tiempo.segundos === 0;
  }

  setConfig( partes: number, segsParte: number ){
    this.partes = partes;
    this.segsParte = segsParte;
  }

  finPartido(){
    this.tiempo.finPartido = true;
  }

  inicioParte(){
    this.tiempo.parte++;
    this.tiempo.segundos = 0; 
    this.tiempo.finParte = false;
  }

  finParte(){
    this.tiempo.finParte = true;
    this.tiempo.encendido = false;
  }

  pasoTiempo(){
    // Función que se ejecuta cada segundo si el crono está encendido
    // Valorar setInterval
    setTimeout(() => {
      console.log("tic");
      console.log("encendido?", this.tiempo.encendido);
      if (this.tiempo.encendido){
        if (this.tiempo.segundos >= this.segsParte){
          this.tiempo.finParte = true;
          this.tiempo.encendido = false;
          return this.tiempo.encendido;
        }
        this.pasoTiempo();
        this.tiempo.segundos = this.tiempo.segundos + 1;
        this.tickObservableData = {segundos: this.tiempo.segundos};
      };
    }, 1000);

    return this.tiempo.encendido;
  }

  /**
   * Función que retorna el instante actual
   * @returns a shallow copy of the current "tiempo" object
   */
  marcaTiempo(){
    return { ...this.tiempo };
  }

  getEncendido(){
    // Función que obtiene el estado del crono
    return this.tiempo.encendido;
  }

  encender(){
    // Función que enciende el crono
    this.tiempo.encendido = true;
    this.pasoTiempo();
  }

  apagar(){
    // Función que apaga el crono
    this.tiempo.encendido = false;
  }

  reset(){
    this.tiempo = {
      encendido: false,
      finParte: false,
      finPartido: false,
      parte: 1,
      segundos: 0
    };

    this.partes = null;
    this.segsParte = null;
  }
}
