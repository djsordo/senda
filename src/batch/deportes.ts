
import { Firestore } from 'firebase/firestore';

import { Interfaz,
        doNothing } from './interfaz.js';

export async function menuDeportes( firestore : Firestore ){
  let deportes = new Deportes( firestore );
  let interfaz = Interfaz.getInstance();
  return interfaz.menu( 'Deportes', 
        [ {value: 1, name: 'Alta deporte', obj: deportes, action: deportes.addDeporte },
          {value: 2, name: 'Baja deporte', action: doNothing },
          {value: 0, name: 'Salir', action: doNothing }] );
}


class Deportes {

  private interfaz : Interfaz;

  constructor( private firestore : Firestore ) {
    this.interfaz = Interfaz.getInstance();
  }

  async addDeporte(){
    return new Promise( (resolve) => { 
      this.interfaz.pickupString("Nombre del deporte")
      .then( (typedValue : string ) => {
        this.interfaz.writeLine("el usuario ha escrito "); 
        this.interfaz.writeLine( typedValue );
        resolve( typedValue ); 
      });
    });
  }
  
}
