/**
 * app2.ts -
 *
 *
 */
'use strict';
import { readFileSync } from "fs";
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { environment } from '../environments/environment.js';
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore(app);
let usuarioRef = collection(firestore, 'usuarios');
/*
getDocs( query( usuarioRef ) )
  .then( (value : QuerySnapshot<DocumentData> ) => {
    for( let elem of value.docs ){
      console.log('-----------------------------------');
      writeFileSync( "prueba-angel.json",
            JSON.stringify( elem.data(), null, 2 ) );
      console.log( "he terminado" );
    }
  } );
*/
let user = JSON.parse(readFileSync("prueba-angel.json", { encoding: 'utf-8' }));
setDoc(doc(firestore, 'usuarios', 'raul-luna'), user);
