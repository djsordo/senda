import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CronoService {
  tiempo = {
    encendido: false,
    parte: 1,
    minuto: 0,
    segundo: 0
  };

  constructor() { }

  pasoTiempo(){
    // Función que se ejecuta cada segundo si el crono está encendido
    setTimeout(() => {
      if (this.tiempo.encendido){
        this.pasoTiempo();
        this.tiempo.segundo++;

        if (this.tiempo.segundo === 60) {
          this.tiempo.minuto++;
          this.tiempo.segundo = 0;
        }
      }
    }, 1000);
    return this.tiempo.encendido;
  }

  marcaTiempo(){
    // Función que devuelve el instante actual
    const ahora = {
      parte: this.tiempo.parte,
      minuto: this.tiempo.minuto,
      segundo: this.tiempo.segundo
    };
    return ahora;
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
}
