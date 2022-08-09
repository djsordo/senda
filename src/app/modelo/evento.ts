
/* import { Jugador } from './jugador'; */
/* import { Equipo } from './equipo';*/
import { Acciones } from '../services/eventos.service';
import { Crono } from './crono';
import { EstadJugador } from './estadJugador';

export interface Evento {
  id: string;
  jugadorId: string;
  equipoId: string;
  partidoId: string;
  timestamp?: Date;
  jugador: EstadJugador;
  /* equipo?: Equipo; */
  accionPrincipal: Acciones;
  accionSecundaria?: string;
  posicionCampo?: string;
  posicionPorteria?: string;
  crono: Crono;
}

