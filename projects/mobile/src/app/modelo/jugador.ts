import { Equipo } from "./equipo";

export interface Jugador {
  id?: string;
  equipoId?: string[];
  equipo?: Equipo[];
  numero: string;
  nombre: string;
  posicion: string;
  portero: boolean;
  foto: string;
}

