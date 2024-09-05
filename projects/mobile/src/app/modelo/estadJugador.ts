import { Jugador } from './jugador';


export function initEstadJugador() : EstadJugador{
  return Object.create({
    datos : null,
    partidoId : '',
    amarillas : 0,
    azules : 0,
    exclusiones : 0,
    goles : 0,
    lanzFallados : 0,
    perdidas : 0,
    robos : 0,
    rojas : 0,
    segExclusion : 0,
    exclusion : false,
    paradas : 0,
    golesRival : 0,
    segJugados : 0
});
}

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

