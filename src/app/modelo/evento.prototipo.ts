
enum TipoEvento {
  positivo = 1, 
  negativo = -1,
  neutro = 0
}

interface EventoPrototipo {

  id : string; 
  positivo : TipoEvento;

}