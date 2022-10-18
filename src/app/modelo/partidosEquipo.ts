import { Partido } from './partido';

export interface PartidosEquipo{
  equipoId: string;
  partidos: {
    anteriores: Partido[];
    proximos: Partido[];
    programados: Partido[];
  };
}
