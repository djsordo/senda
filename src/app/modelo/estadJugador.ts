import { Jugador } from './jugador';
export interface EstadJugador{
  id?: string;
  datos: Jugador;
  partidoId: string;
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
  paradas: number;
  golesRival: number;
  segJugados: number;
};

