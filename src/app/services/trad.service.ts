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
        'accion.2_minutos' : '2 minutos', 
        'accion.tarjeta_amarilla': 'tarjeta amarilla', 
        'accion.tarjeta_roja' : 'tarjeta roja', 
        'accion.tarjeta_azul' : 'tarjeta azul'
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