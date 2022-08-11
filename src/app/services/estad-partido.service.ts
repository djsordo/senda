import { EstadPartido } from './../modelo/estadPartido';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstadPartidoService {
  estadPartido: EstadPartido = {
    amarillas: 0,
    azules: 0,
    exclusiones: 0,
    goles: 0,
    golesRival: 0,
    lanzFallados: 0,
    nombreEquipo: null,
    nombreRival: null,
    paradas: 0,
    partidoId: null,
    perdidas: 0,
    robos: 0,
    rojas: 0,
    dosMinutos: 0,
    dosMinutosRival: 0,
    tm: 0,
    tmRival: 0
  };

  constructor() {}

  actualiza(campo: string, valor: any){
    this.estadPartido[campo] = valor;
  }

  suma(campo: string){
    this.estadPartido[campo]++;
    console.log(this.estadPartido);
  }
}
