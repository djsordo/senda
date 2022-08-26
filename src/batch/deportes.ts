
import { Firestore } from 'firebase/firestore';

import { Interfaz } from './interfaz.js';


// AQUI ME QUEDO: INTERFAZ DEBERÍA SER UN SINGLETON, 
// ASÍ CON LLAMAR A Interfaz.getInstance() YA OBTENDRÍAMOS
// LA ÚNICA INSTANCIA DISPONIBLE EN EL SISTEMA
export async function menuDeportes( firestore : Firestore ){
  let deportes = new Deportes( firestore );
  let menu = new Menu( 'Deportes', 
              [ {value: 1, name: 'Alta deporte', action: deportes.addDeporte },
                {value: 2, name: 'Baja deporte', action: doNothing },
                {value: 0, name: 'Salir', action: doNothing }]);
  return menu.show();
}


class Deportes {

  constructor( private firestore : Firestore ) {}

  async addDeporte(){
    console.log( 'aquí me falta acceso a un interfaz de usuario' );
    return new Promise( (resolve) => { resolve( null ); } );
  }
  
}
