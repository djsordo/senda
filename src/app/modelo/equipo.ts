import { Partido } from './partido';

export interface Equipo {

  id: string;
  nombre: string;
  categoria: string;
  genero: string;
  partidos: Partido[];
}

