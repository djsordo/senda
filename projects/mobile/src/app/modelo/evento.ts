
/* import { Jugador } from './jugador'; */
/* import { Equipo } from './equipo';*/
import { Acciones } from '../services/eventos.service';
import { Crono } from './crono';

export interface Evento {
  id: string;
  jugadorId: string;
  equipoId: string;
  partidoId: string;
  timestamp?: Date;
  creadorEvento: string;
  accionPrincipal: Acciones;
  accionSecundaria?: string;
  posicionCampo?: string;
  posicionPorteria?: string;
  crono: Crono;
}

