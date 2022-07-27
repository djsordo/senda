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
    // Función que se ejecuta cada decima de segundo si el crono está encendido
    setTimeout(() => {
      if (this.tiempo.encendido){
        this.pasoTiempo();
        this.tiempo.segundo = this.tiempo.segundo + 1;

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.cronos2min.length; i++){
          this.cronos2min[i].segundos = this.cronos2min[i].segundos - 1;
        };
      };
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
  setCrono2min(numeroJug: any, seg: any){
    const crono2min = {numero: numeroJug, segundos: seg};
    this.cronos2min.push(crono2min);
  }

  sumaCrono2min(numeroJug: any, seg: any){
    const indice = this.cronos2min.findIndex(crono => crono.numero === numeroJug);
    this.cronos2min[indice].segundos += seg;
  }

  // Vemos el crono del jugador
  getCrono2min(numeroJug: any){
    return this.cronos2min.find(crono => crono.numero === numeroJug);
  }

  // Borra el crono del jugador
  deleteCrono2min(numeroJug: any){
    const indice = this.cronos2min.indexOf(this.cronos2min.find(crono => crono.numero === numeroJug));
    this.cronos2min.splice(indice, 1);
  }
}
