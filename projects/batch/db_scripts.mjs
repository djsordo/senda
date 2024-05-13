/**
 * db_script.js - run update commands into the database
 * 
 */
'use strict';

import { stdout } from 'node:process';
import { deleteApp, initializeApp } from "firebase/app";
import { getFirestore,
        collection, 
        getDocs, 
        setDoc,
        doc,
        deleteDoc} from "firebase/firestore";


import { environment } from "../../PRIVATE/environment.prod.mjs";


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

function printHeader( headerInfo ) {
  for( let [k, v] of Object.entries( headerInfo ) ){
    stdout.write( "| " );
    stdout.write( k.padEnd( v, " " ) );
  }
  stdout.write("|\n");
  for( let v of Object.values( headerInfo ) ){
    stdout.write( "| " );
    stdout.write( "-".padEnd( v, "-" ) );
  }
  stdout.write("|\n");
}


function list( firebaseConfig, collectionName, perRecordCallback, headerInfo ) {
  let app = initializeApp( firebaseConfig );
  let db = getFirestore(app);

  printHeader( headerInfo ); 
  getDocs(collection(db, collectionName))
  .then( (qSnap) => {
    Promise.all( qSnap.docs.map( (doc) => perRecordCallback( db, doc.id, doc.data(), headerInfo ) ) )
    .then( (results) => onFinishApplication( app, results ) );
    });

}

function listEventos( firebaseConfig ){
  let headerInfo = { accionPrincipal : 20, 
                     timestamp : 40 }
  list( firebaseConfig, 
      "eventos", 
      onEvento, 
      headerInfo );
}

function listPartidos( firebaseConfig ){
  let headerInfo = { temporadaId: 10, 
                    tipo: 10, 
                    rival : 30, 
                    ubicacion: 30, 
                    jornada: 3 };
  list( firebaseConfig, 
     "partidos", 
     onPartido, 
     headerInfo );
}

function onPartido( db, docId, docData, headerInfo ){
  //console.log( `docId: ${docId}` );
  //console.log( docData );
  for( let [k,v] of Object.entries(headerInfo) ){
    stdout.write( "| " ); 
    if( typeof docData[k] === "string" )
      stdout.write( docData[k].padEnd(v, " " ) );
    else if( typeof docData[k] === "number" )
      stdout.write( docData[k].toString().padEnd(v, " ") );
    else if( typeof docData[k] === "object" )
      stdout.write( docData[k].toString() )
    else 
      stdout.write( "".padEnd(v, " ") );
  }
  stdout.write( "|\n" );
}

function onEvento( db, docId, docData, headerInfo ){
  let timestamp = docData.timestamp; 
  stdout.write( "| " ); 
  stdout.write( docData.accionPrincipal.padEnd( headerInfo["accionPrincipal"], " ") );
  stdout.write( "| " ); 
  stdout.write( docData.timestamp.toDate().toString().padEnd( headerInfo["timestamp"], " ") );
  stdout.write( "|\n" );
}

function updateUsers( firebaseConfig ) {
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

console.log('Scripts for configuring the database');
// listEventos( environment.firebaseConfig );
updateUsers( environment.firebaseConfig );






