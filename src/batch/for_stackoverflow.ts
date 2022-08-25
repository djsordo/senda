import { initializeApp } from "firebase/app";
import { getFirestore, 
          Firestore } from "@angular/fire/firestore";


import { environment } from '../environments/environment.js';
import { EquipoService } from '../app/services/equipo.service.js';

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const firestore = getFirestore( app );


const main = async ( firestore : Firestore ) => {
  console.log('hello');
  let equipoService = new EquipoService( firestore );
}

main( firestore );


