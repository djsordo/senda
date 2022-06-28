
import { Jugador } from './jugador';
import { Accion } from './accion';
import { Equipo } from './equipo'; 

export interface Evento {

  id : string;
  timestamp? : Date;
  jugador : Jugador;
  equipo? : Equipo; 
  accion : Accion;
  crono : { parte : number, 
          minuto : number, 
          segundo: number};
}

