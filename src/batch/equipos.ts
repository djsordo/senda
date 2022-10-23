
import { collection, DocumentData, Firestore, getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { Interfaz, 
        doNothing } from './interfaz.js';

export async function menuEquipos( firestore : Firestore ){
  let interfaz = Interfaz.getInstance();
  return interfaz.menu( 'Equipos', 
              [ {value: 1, name: 'Lista de equipos', action: listaEquipos, arg: firestore },
                {value: 0, name: 'Salir', action: doNothing }]);
}

async function listaEquipos( firestore : Firestore ){
  return new Promise( (resolve, reject) => {
    let interfaz = Interfaz.getInstance();
    getDocs( query( collection( firestore, 'equipos' ) ))
      .then( (qSnap : QuerySnapshot<DocumentData>) => {
        for( let doc of qSnap.docs ){
          console.log( doc.data() );
        }
      } );
  } );
}