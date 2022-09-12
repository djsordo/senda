
export interface Partido{
  id?: string;
  equipoId: string;
  fecha: string;
  rival: string;
  temporadaId: string;
  tipo: string; // 'amistoso' | 'liga'
  jornada: string;
  ubicacion: string;
  config: {
    partes: number;
    segsParte: number;
    estado: string; // Puede ser 'programado', 'en curso', 'finalizado'
  };
}
