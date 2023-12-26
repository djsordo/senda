import { Club } from './club';
import { Partido } from './partido';
import { Temporada } from './temporada';

export interface Equipo {
  id?: string;
  nombre: string;
  nombreCorto?: string;
  screenName?: string;
  club: Club;
  categoria: string;
  genero: string;
  temporada: Temporada;
  partidos?: Partido[];
}

