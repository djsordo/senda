
/* import { Jugador } from './jugador'; */
/* import { Equipo } from './equipo';*/
import { Acciones } from '../services/eventos.service';
import { CronoData } from './cronoData';

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
  crono: CronoData;
}

