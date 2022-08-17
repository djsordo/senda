
export interface Partido{
  id?: string;
  equipoId: string;
  fecha: string;
  rival: string;
  temporadaId: string;
  tipo: string;
  ubicacion: string;
  jugado: boolean;
  config: {
    partes: number;
    segsParte: number;
  };
}
