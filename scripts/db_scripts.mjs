/**
 * db_script.js - run update commands into the database
 * 
 */
'use strict';

import { deleteApp, initializeApp } from "firebase/app";
import { getFirestore,
        collection, 
        getDocs, 
        setDoc,
        doc,
        deleteDoc} from "firebase/firestore";


import { environment } from "../PRIVATE/environment.mjs";


function make_id( ...values ){

  let replacements = [{regexp : /[áàäâ]/g, replacement : 'a'},
                      {regexp : /[éèëê]/g, replacement : 'e'},
                      {regexp : /[íìïî]/g, replacement : 'i'},
                      {regexp : /[óòöô]/g, replacement : 'o'},
                      {regexp : /[úùüû]/g, replacement : 'u'},
                      {regexp : /ñ/g     , replacement : 'n'},
                      {regexp : /_el_/g,     replacement : '_'},
                      {regexp : /_la_/g,     replacement : '_'},
                      {regexp : /_los_/g,    replacement : '_'},
                      {regexp : /_las_/g,    replacement : '_'},
                      {regexp : /_un_/g,     replacement : '_'},
                      {regexp : /_una_/g,    replacement : '_'},
                      {regexp : /_unos_/g,   replacement : '_'},
                      {regexp : /_unas_/g,   replacement : '_'},
                      {regexp : /_the_/g,    replacement : '_'},
                      {regexp : /_and_/g,    replacement : '_'},
                      {regexp : /[%&\/\\¿?¡!]/g, replacement : '_' }];

  let s = '';
  for( let val of values ){
    s += ' ' + val;
  }

  s = s.trim().toLowerCase();
  s = s.replaceAll( /\s+/g, '_' );
  for( let repl of replacements ){
    s = s.replaceAll( repl.regexp, repl.replacement );
  }
  s = s.replaceAll( /[^\w]/g, '_' );
  s = s.replaceAll( /_+/g, '_' );
  s = s.replace( /^_/, '' );
  s = s.replace( /_$/, '' );
  return s;
}


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
  if( userData.perms ){
    console.log( `Borramos entrada perms a usuario: ${userData.email}` );
    delete userData.perms;
    return setDoc( doc( db, "usuarios", userId ), userData );
  }
  if( userData.permsTemplate ){
    console.log( `Borramos entrada permsTemplate a usuario: ${userData.email}` );
    delete userData.permsTemplate;
    return setDoc( doc(db, "usuarios", userId ), userData );
  }
  // change all id's of the users
  let newUserId = make_id( userData.nombre, userData.apellidos, userData.email );
  return new Promise( (resolve, reject) => {
    setDoc( doc( db, "usuarios", newUserId ), userData )
      .then( (value) => {
        deleteDoc( doc( db, "usuarios", userId ) )
          .then( (value) => resolve(value) );
      })
  });
}

function onFinishApplication( app, results ) {
  // release the connection to the backend
  deleteApp( app );
        
  console.log( 'finished' );
}

console.log('hello');
main( environment.firebaseConfig );




