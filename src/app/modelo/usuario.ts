import { Club } from './club';
import { Equipo } from './equipo';

export interface Usuario{
  id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  club: Club;
  roles: [
    {
      equipo: Equipo;
      nombre: string;
    }
  ];
}
