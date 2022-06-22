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

  // En este array se llevan los 2 minutos
  cronos2min = [];

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

  // Se activa un crono de 2 minutos
  setCrono2min(numeroJug: any){
    const crono2min = {numero: numeroJug, minutos: 2, segundos: 0};
    this.cronos2min.push(crono2min);
  }

  // Vemos el crono del jugador
  getCrono2min(numeroJug: any){
    return this.cronos2min.find(crono => crono.numero === numeroJug);
  }
}
