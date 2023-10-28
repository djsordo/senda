/**
 * db_script.js - run update commands into the database
 * 
 */
'use strict';

import * as fs from 'fs';
import { deleteApp, initializeApp } from "firebase/app";
import { getFirestore,
        collection, 
        getDocs, 
        setDoc,
        doc} from "firebase/firestore";


import { environment } from "../PRIVATE/environment.mjs";
        
function main( firebaseConfig ) {
  let app = initializeApp( firebaseConfig );
  let db = getFirestore(app);
  
  getDocs(collection(db, "usuarios"))
  .then( (qSnap) => {
    Promise.all( qSnap.docs.map( (doc) => onUser( db, doc.id, doc.data() ) ) )
      .then( (results) => onFinishApplication(app, results) );
  });
}

function onUser( db, userId, userData ){
  if( userData.perfil ){
    console.log( `Encontrada propiedad 'perfil' en usuario ${userData.email}: `);
    console.log( 'Procedemos a moverla a roles...' );
    userData.roles.push( {nombre: userData.perfil } );
    delete userData.perfil;
    console.log( userData );
    return setDoc( doc( db, "usuarios", userId ), userData );
  }
  else
    return null;
}

function onFinishApplication( app, results ) {
  // release the connection to the backend
  deleteApp( app );
        
  console.log( 'finished' );
}

console.log('hello');
main( environment.firebaseConfig );





