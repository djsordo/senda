
import { Jugador } from './jugador';
import { Accion } from './accion';
import { Equipo } from './equipo'; 

export interface Evento {

  id : string;
  timestamp? : Date;
  jugador : Jugador;
  equipo? : Equipo; 
  accion : Accion;
  posicionCampo? : string, 
  posicionPorteria? : string, 
  crono : { parte : number, 
          minuto : number, 
          segundo: number};
}

