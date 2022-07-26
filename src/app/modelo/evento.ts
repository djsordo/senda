
import { Jugador } from './jugador';
import { Equipo } from './equipo'; 
import { Acciones } from '../services/eventos.service';

export interface Evento {

  id : string;
  timestamp? : Date;
  jugador : Jugador;
  equipo? : Equipo; 
  accion : Acciones;
  posicionCampo? : string, 
  posicionPorteria? : string, 
  crono : { parte : number, 
          minuto : number, 
          segundo: number};
}

