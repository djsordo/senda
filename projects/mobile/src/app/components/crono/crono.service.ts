import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Crono } from 'projects/mobile/src/app/modelo/crono';

export interface Tick {
  segundos: number;
}

@Injectable({
  providedIn: 'root'
})
export class CronoService {
  tiempo: Crono = {
    encendido: false,
    finParte: false,
    finPartido: false,
    parte: 1,
    segundos: 0
  };

  partes: number;
  segsParte: number;

  // Observable que de un tick cada segundo cuando el crono está encendido
  private tickObservablePrivate: BehaviorSubject<Tick> = new BehaviorSubject<Tick>({segundos: 0});

  constructor() {
    this.partes = +localStorage.getItem('partes');
    this.segsParte = +localStorage.getItem('segsParte');
  }

  get tickObservable(){
    return this.tickObservablePrivate.asObservable();
  }

  set tickObservableData(data: Tick){
    this.tickObservablePrivate.next(data);
  }

  pasoTiempo(){
    // Función que se ejecuta cada segundo si el crono está encendido
    // Valorar setInterval
    setTimeout(() => {
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

  marcaTiempo(){
    // Función que devuelve el instante actual
    return JSON.parse(JSON.stringify(this.tiempo));
  }

  getEncendido(){
    // Función que obtiene el estado del crono
    return this.tiempo.encendido;
  }

  encender(){
    // Función que enciende el crono
    this.tiempo.encendido = true;
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

    this.partes = +localStorage.getItem('partes');
    this.segsParte = +localStorage.getItem('segsParte');
  }
}
