import { Crono } from 'projects/mobile/src/app/modelo/crono';
export interface EstadPartido{
  id?: string;
  partidoId: string;
  nombreEquipo: string;
  nombreRival: string;
  goles: number;
  lanzFallados: number;
  robos: number;
  perdidas: number;
  amarillas: number;
  rojas: number;
  azules: number;
  paradas: number;
  golesRival: number;
  dosMinutos: number;
  dosMinutosRival: number;
  tm: number;
  tmRival: number;
  crono: Crono;
};
