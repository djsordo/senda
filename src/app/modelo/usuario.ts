import { Club } from './club';
import { Equipo } from './equipo';

export interface Usuario{
  id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  club: Club;
  perfil?: string; // Perfil principal del usuario. Distinguir de los roles que tiene en cada equipo. (admin, dt (director técnico))
  roles: [
    {
      equipo: Equipo;
      nombre: string;
    }
  ];
}
