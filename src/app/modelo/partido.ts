import { Equipo } from "./equipo";
import { Temporada } from "./temporada";
import { Ubicacion } from "./ubicacion";

export enum TipoPartido {
  amistoso = "amistoso"
}

export interface Partido {
  id : string; 
  equipo : Equipo; 
  fecha: Date;
  jornada: number;
  rival: string;
  temporada: Temporada;
  tipo : TipoPartido;
  ubicacion : Ubicacion;
}

