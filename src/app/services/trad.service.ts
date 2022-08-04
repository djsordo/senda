import { Injectable } from "@angular/core";

/**
 * Servidor de traducciones
 */
@Injectable({
  providedIn: 'root'
})
export class TradService{


  private dict = {
    'es' :
      { 'accion.parada' : 'parada',
        'accion.gol_rival' : 'gol rival',
        'accion.lanzamiento' : 'lanzamiento',
        'accion.gol' : 'gol',
        'accion.tiro' : 'tiro',
        'accion.perdida' : 'pérdida',
        'accion.robo' : 'robo',
        'accion.cambio' : 'cambio',
        'accion.entra' : 'entra',
        'accion.sale' : 'sale',
        'accion.2_minutos' : '2 minutos',
        'accion.tarjeta_amarilla': 'tarjeta amarilla',
        'accion.tarjeta_roja' : 'tarjeta roja',
        'accion.tarjeta_azul' : 'tarjeta azul',
        'posicion.contras' : 'contras',
        'posicion.7m' : 'siete metros',
        'posicion.ext_izq' : 'extremo izquierdo',
        'posicion.ext_der' : 'extremo derecha',
        'posicion.6m_izq' : 'seis metros, izquierda',
        'posicion.6m_cen' : 'seis metros, centro',
        'posicion.6m_der' : 'seis metros, derecha',
        'posicion.9m_izq' : 'nueve metros, izquierda',
        'posicion.9m_cen' : 'nueve metros zona centro',
        'posicion.9m_der' : 'nueve metros, derecha',
        'posicion.otros' : 'otras posiciones',
        'porteria.arr_izq' : 'tercio superior izquierda',
        'porteria.arr_cen' : 'tercio superior centro',
        'porteria.arr_der' : 'tercio superior derecha',
        'porteria.cen_izq' : 'tercio medio izquierda',
        'porteria.cen_cen' : 'tercio medio centro',
        'porteria.cen_der' : 'tercio medio derrecha',
        'porteria.aba_izq' : 'tercio inferior izquierda',
        'porteria.aba_cen' : 'tercio inferior centro',
        'porteria.aba_der' : 'tercio inferior derecha',
        'porteria.fuera_izq': 'sale por la izquierda',
        'porteria.fuera_arr': 'sale por arriba',
        'porteria.fuera_der': 'sale por la derecha'
      },
  };

  /**
   * la codificación de idiomas que se usará es la
   * del iso 639-1 y ISO 3166-1 alpha-2:
   *
   *    es : español
   *    en: inglés
   *    en_US: inglés de estados unidos)
   *
   * https://es.wikipedia.org/wiki/ISO_639-1
   * https://es.wikipedia.org/wiki/ISO_3166-1_alfa-2
   *
   */
  private idiomaActual = 'es';

  constructor(){
  }

  public t(key : string) : string {
    try{
      if( this.dict[this.idiomaActual][key] )
        return this.dict[this.idiomaActual][key];
      else
        return `???${this.idiomaActual}.${key}???`;
    }catch( error ){
      return `???${this.idiomaActual}.${key}???`;
    }
  }


}
