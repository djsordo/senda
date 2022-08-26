import { initializeApp } from "firebase/app";
import { getFirestore, 
        query,
        collection } from 'firebase/firestore';

import { environment } from '../environments/environment.js';
import { Interfaz, doNothing } from './interfaz.js';
import { menuDeportes } from './deportes.js';
import { menuEquipos } from './equipos.js';

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore( app );
//let equipoService = new EquipoService( firestore );

//const partidoRef = query( collection( firestore, 'partidos' ));

//console.log( partidoRef );


// const main = async () => {
//   let menuPrincipal = new Menu( 'Menu Principal', 
//       [{value: 1, name: 'Deportes', action: menuDeportes, arg : firestore },
//       {value: 2, name: 'Equipos', action: menuEquipos },
//       {value: 3, name: 'Partidos', action: doNothing },
//       {value: 4, name: 'Usuarios', action: doNothing },
//       {value: 0, name: 'Salir', action: doNothing }] );
//   await menuPrincipal.show();
//   rl.close();
// }

//main();

let iface = new Interfaz();


iface.menu( 'Menu Principal', 
                [{value: 1, name: 'Deportes', action: menuDeportes, arg : firestore },
                {value: 2, name: 'Equipos', action: menuEquipos },
                {value: 3, name: 'Partidos', action: doNothing },
                {value: 4, name: 'Usuarios', action: doNothing },
                {value: 0, name: 'Salir', action: doNothing }] )
        .then( (value) => { console.log( 'valor recibido: ', value );})
        .finally( () => iface.close() );

