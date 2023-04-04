import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  QuerySnapshot,
  setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Deporte } from '../modelo/deporte';
import { Club } from '../modelo/club';





@Injectable({
  providedIn: 'root'
})
export class Db {

  constructor(private firestore: Firestore) {
  }
  
  private simpleAdd( collectionName: string, obj : object ) {
    let id = this.makeId( obj );
    return setDoc( doc( collection( this.firestore, collectionName ), id ), obj ); 
  }

  private simpleDel( collectionName: string, docId : string ) {
    return deleteDoc( doc( this.firestore, collectionName, docId ) );
  }

  private simpleQuery(collectionName: string, clause?: QueryConstraint | string) {
    if (typeof clause === 'string')
      return new Promise( (resolve, reject) => {
        getDoc( doc(collection(this.firestore, collectionName), clause) )
        .then( (qSnapshot : DocumentSnapshot) => {
          resolve( {...qSnapshot.data, "id" : qSnapshot.id } );
        })
        .catch( reason => reject( reason ) );
      });
    else
      return new Promise( (resolve,reject) => {
        getDocs( query(collection(this.firestore, collectionName), clause) )
        .then( (qSnap : QuerySnapshot<DocumentData> ) => {
          let returnVal = [];
          for( let docData of qSnap.docs ){
            returnVal.push( {...docData.data(), "id" : docData.id } );
          }
          resolve( returnVal );
        })
        .catch( reason => reject( reason ) );
      });
  }

  private simpleQuerySub(collectionName: string, clause?: QueryConstraint | string): Observable<any> {
    if (typeof clause === 'string'){
      return docData( doc( this.firestore, collectionName, clause ) );    
    }
    else{
      let ref = null;
      if( clause ) 
        ref = query(collection(this.firestore, collectionName), clause);
      else
        ref = collection(this.firestore, collectionName);
      return collectionData( ref );
    }
  }

  public deporte(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("deportes", clause);
  }

  public deporteSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("deportes", clause );
  }

  public deporteAdd( deporte : Deporte ) {
    return this.simpleAdd( "deportes", deporte );
  }

  public deporteDel( deporteId: string ) {
    return this.simpleDel( "deportes", deporteId );
  }

  public club(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("clubs", clause);
  }

  public clubSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("clubs", clause );
  }

  public clubAdd( club : Club ) {
    return this.simpleAdd( "clubs", club );
  }

  public clubDel( clubId: string ) {
    return this.simpleDel( "clubs", clubId );
  }

  public equipo(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("equipos", clause);
  }

  public jugador(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("jugadores", clause);
  }

  public partido(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("partidos", clause);
  }

  public temporada(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("temporadas", clause);
  }

  public usuario(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("usuarios", clause);
  }

  public estadJugador(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("estadJugadores", clause);
  }

  public estadPartidos(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("estadPartidos", clause);
  }


  private makeId( obj : object ) : string {

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
    for( let property in obj ){
      if( typeof obj[property] === 'string' )
        s += ' ' + obj[property];
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
  
}


