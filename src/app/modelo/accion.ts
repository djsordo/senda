
/**
 * @deprecated
 * Parecía una buena idea tipificar las acciones como positivas 
 * o negativas, pero no: se desaconseja su uso.
 */
export enum TipoAccion {
  positivo = 1, 
  negativo = -1,
  neutro = 0
}

/**
 * @deprecated 
 * En principio parecía una buena idea, pero ya no lo veo 
 * como tal: usar en su lugar el enum Acciones para identificar
 * una accion.
 * 
 */
export interface Accion {
  id : string; 
  alias : Array<string>;
  positivo : TipoAccion;

}