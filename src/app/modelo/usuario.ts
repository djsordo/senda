export interface Usuario{
  id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  club: {
    deporte: {
      nombre: string;
    };
    nombre: string;
  };
  roles: [
    {
      equipo: string;
      nombre: string;
    }
  ];
}
