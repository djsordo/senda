

interface Evento {

  id : string;
  timestamp : Date;
  jugador : Jugador;
  equipo : Equipo; 
  accion : EventoPrototipo;
  crono : string;
}