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
      equipo: {
        equipoId: string;
        nombre: string;
        categoria: string;
        genero: string;
      };
      nombre: string;
    }
  ];
}
