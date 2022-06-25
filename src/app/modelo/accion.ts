
export enum TipoAccion {
  positivo = 1, 
  negativo = -1,
  neutro = 0
}

export interface Accion {

  id : string; 
  positivo : TipoAccion;

}