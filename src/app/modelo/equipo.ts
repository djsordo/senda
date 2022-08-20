import { Club } from './club';
import { Partido } from './partido';

export interface Equipo {
  id: string;
  nombre: string;
  club : Club;
  categoria: string;
  genero: string;
  temporada: string;
  partidos?: Partido[];
}

