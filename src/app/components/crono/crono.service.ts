import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tick {
  segundos: number;
}

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
  /* cronos2min = []; */

  // Observable que de un tick cada segundo cuando el crono está encendido
  private tickObservablePrivate: BehaviorSubject<Tick> = new BehaviorSubject<Tick>({segundos: 0});

  constructor() { }

  get tickObservable(){
    return this.tickObservablePrivate.asObservable();
  }

  set tickObservableData(data: Tick){
    this.tickObservablePrivate.next(data);
  }

  pasoTiempo(){
    // Función que se ejecuta cada decima de segundo si el crono está encendido
    // Valorar setInterval
    setTimeout(() => {
      if (this.tiempo.encendido){
        this.pasoTiempo();
        this.tiempo.segundo = this.tiempo.segundo + 1;
        this.tickObservableData = {segundos: this.tiempo.segundo};

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
/*         for (let i = 0; i < this.cronos2min.length; i++){
          this.cronos2min[i].segundos = this.cronos2min[i].segundos - 1;
        }; */
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
  /* setCrono2min(juadorId: any, seg: any){
    const crono2min = {id: juadorId, segundos: seg};
    this.cronos2min.push(crono2min);
  } */

  /* sumaCrono2min(jugadorId: any, seg: any){
    const indice = this.cronos2min.findIndex(crono => crono.id === jugadorId);
    this.cronos2min[indice].segundos += seg;
  } */

  // Vemos el crono del jugador
  /* getCrono2min(jugadorId: any){
    return this.cronos2min.find(crono => crono.id === jugadorId);
  } */

  // Borra el crono del jugador
  /* deleteCrono2min(jugadorId: any){
    const indice = this.cronos2min.indexOf(this.cronos2min.find(crono => crono.id === jugadorId));
    this.cronos2min.splice(indice, 1);
  } */
}
