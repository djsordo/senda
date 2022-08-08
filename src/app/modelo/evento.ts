
/* import { Jugador } from './jugador'; */
import { Equipo } from './equipo';
import { Acciones } from '../services/eventos.service';
import { EstadJugador } from './estadJugador';

export interface Evento {

  id: string;
  jugadorId: string;
  equipoId: string;
  partidoId: string;
  timestamp?: Date;
  jugador: EstadJugador;
  equipo?: Equipo;
  accion: Acciones;
  posicionCampo?: string;
  posicionPorteria?: string;
  crono: { parte: number;
          minuto: number;
          segundo: number;};
}

