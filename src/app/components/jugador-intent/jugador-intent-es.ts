/**
 * aquí tenemos que registrar cosicas como: 
 * 
 * "gol de nombre-jugador"
 * "tiro de nombre-jugador"
 * "gol de nombre-jugador desde area central a zona1"
 * "fallo de nombre-jugador, se sale por el area..."
 * "fallo de nombre-jugador"
 * "parada de nombre-portero"
 * "robo de nombre-jugador"
 * "dos minutos de nombre-jugador"
 * "[tarjeta] roja para nombre-jugador"
 * "[tarjeta] amarilla para nombre-jugador"
 * "[tarjeta] azul para nombre-jugador"
 * 
 */
export class JugadorIntentEs{

  private accion = [ "gol", 
                    "tiro", 
                    "tiro a puerta", 
                    "parada", 
                    "fallo", 
                    "roja", 
                    "tarjeta roja", 
                    "amarilla", 
                    "tarjeta amarilla", 
                    "azul", 
                    "tarjeta azul" ];
  private preposicion = ["a", "con", "de", "desde", "en", "por" ];
  private jugador = ["javi", "javier", "cesar", "maria", "santi", "lucas", 
                  "1", "2", "3", "4", "5" ];
  // "gol de maria"
  private intent1 = [ this.accion, 
                    this.preposicion, 
                    this.jugador ];
  private allIntents = [ this.intent1 ];

  public parseIntent( sentence : string ){
  
  }


}

