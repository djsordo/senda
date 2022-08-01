import { Equipo } from './equipo';

export interface Usuario{
  id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  club: {
    clubId: string;
    nombre: string;
  };
  roles: [
    {
      equipo: Equipo;
      nombre: string;
    }
  ];
}
