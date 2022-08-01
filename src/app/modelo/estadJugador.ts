import { Jugador } from './jugador';
export interface EstadJugador{
  datos: Jugador;
  segExclusion: number;
  goles: number;
  lanzFallados: number;
  robos: number;
  perdidas: number;
  exclusiones: number;
  amarillas: number;
  rojas: number;
  azules: number;
  exclusion: boolean;
};
