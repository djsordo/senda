import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentReference,
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
import { EstadPartido } from '../modelo/estadPartido';
import { EstadJugador } from '../modelo/estadJugador';
import { Usuario } from '../modelo/usuario';
import { Temporada } from '../modelo/temporada';
import { Partido } from '../modelo/partido';
import { Jugador } from '../modelo/jugador';
import { Equipo } from '../modelo/equipo';
import { Evento } from '../modelo/evento';





@Injectable({
  providedIn: 'root'
})
export class Db {

  constructor(private firestore: Firestore) {
  }

  private asRef( collectionName: string, id: string ): DocumentReference<DocumentData>  {
    return doc( collection( this.firestore, collectionName ), id );
  }

  private simpleAdd( collectionName: string, obj : object, id: string = null ) {
    if( !id ) 
      id = this.makeId( obj );
    return this.simpleUpdate( collectionName, id, obj );
  }

  private simpleUpdate( collectionName: string, id: string, obj: object ) {
    return setDoc( doc( collection( this.firestore, collectionName ), id ), obj ); 
  }

  private simpleDel( collectionName: string, docId : string ) {
    return deleteDoc( doc( this.firestore, collectionName, docId ) );
  }

  /**
   * Returns the requested information as a promise.
   * 
   * @param collectionName 
   * @param clause 
   * @returns 
   */
  private simpleQuery(collectionName: string, clause?: QueryConstraint | string | null ) {
    if (typeof clause === 'string')
      return new Promise( (resolve, reject) => {
        getDoc( doc(collection(this.firestore, collectionName), clause) )
        .then( (qSnapshot : DocumentSnapshot) => {
          resolve( {...qSnapshot.data(), "id" : qSnapshot.id } );
        })
        .catch( reason => reject( reason ) );
      });
    else{
      let myQuery:any = collection(this.firestore, collectionName);
      if( clause != null ){
        myQuery = query(collection(this.firestore, collectionName), clause);
      }
      return new Promise( (resolve,reject) => {
        getDocs( myQuery )
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
  }

  /**
   * Return the requested information as a subscription.
   * 
   * @param collectionName 
   * @param clause 
   * @returns 
   */
  private simpleQuerySub(collectionName: string, clause?: QueryConstraint | string | null ): Observable<any> {
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

  public getConfig(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("config", clause);
  }

  public getConfigRef( ): DocumentReference<DocumentData>  {
    return this.asRef( "config", "config" );
  }

  public configSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("config", clause );
  }

  public addConfig( config : any ) {
    return this.simpleAdd( "config", config, "config" );
  }

  public updateConfig( config : any ) {
    return this.simpleUpdate( "config", "config", config );
  }

  public delConfig( id: string ) {
    return this.simpleDel( "config", id );
  }

  public getDeporte(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("deportes", clause);
  }

  public getDeporteRef( id : string ): DocumentReference<DocumentData> {
    return this.asRef( "deportes", id );
  }

  public deporteSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("deportes", clause );
  }

  public addDeporte( deporte : Deporte, id: string = null ) {
    return this.simpleAdd( "deportes", deporte, id );
  }

  public updateDeporte( id : string, deporte : Deporte ) {
    return this.simpleUpdate( "deportes", id, deporte );
  }

  public delDeporte( deporteId: string ) {
    return this.simpleDel( "deportes", deporteId );
  }

  public getEvento(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("eventos", clause);
  }

  public getEventoRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "eventos", id );
  }

  public eventoSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("eventos", clause );
  }

  public addEvento( evento : any, id:string = null ) {
    return this.simpleAdd( "eventos", evento, id );
  }

  public updateEvento( id : string, evento : Evento ) {
    return this.simpleUpdate( "eventos", id, evento );
  }

  public delEvento( id: string ) {
    return this.simpleDel( "eventos", id );
  }

  public getClub(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("clubs", clause);
  }

  public getClubRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "clubs", id );
  }

  public clubSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("clubs", clause );
  }

  public addClub( club : Club, id:string = null ) {
    return this.simpleAdd( "clubs", club, id );
  }

  public updateClub( id : string, club : Club ) {
    return this.simpleUpdate( "clubs", id, club );
  }

  public delClub( id: string ) {
    return this.simpleDel( "clubs", id );
  }

  public getEquipo(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("equipos", clause);
  }

  public getEquipoRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "equipos", id );
  }

  public equipoSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("equipos", clause );
  }

  public addEquipo( equipo : Equipo, id:string = null ) {
    return this.simpleAdd( "equipos", equipo, id );
  }

  public updateEquipo( id : string, equipo : Equipo ) {
    return this.simpleUpdate( "equipos", id, equipo );
  }

  public delEquipo( equipoId: string ) {
    return this.simpleDel( "equipos", equipoId );
  }

  public getJugador(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("jugadores", clause);
  }

  public getJugadorRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "jugadores", id );
  }

  public jugadorSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("jugadores", clause );
  }

  public addJugador( jugador : Jugador, id:string = null ) {
    return this.simpleAdd( "jugadores", jugador, id );
  }

  public updateJugador( id : string, jugador : Jugador ) {
    return this.simpleUpdate( "jugadores", id, jugador );
  }

  public delJugador( jugadorId: string ) {
    return this.simpleDel( "jugadores", jugadorId );
  }

  public getPartido(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("partidos", clause);
  }

  public getPartidoRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "partidos", id );
  }

  public partidoSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("partidos", clause );
  }

  public addPartido( partido : Partido, id: string = null ) {
    return this.simpleAdd( "partidos", partido, id );
  }

  public updatePartido( id : string, partido : Jugador ) {
    return this.simpleUpdate( "partidos", id, partido );
  }

  public delPartido( partidoId: string ) {
    return this.simpleDel( "partidos", partidoId );
  }

  public getTemporada(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("temporadas", clause);
  }

  public getTemporadaRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "temporadas", id );
  }

  public temporadaSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("temporadas", clause );
  }

  public addTemporada( temporada : Temporada, id:string = null ) {
    return this.simpleAdd( "temporadas", temporada, id );
  }

  public updateTemporada( id : string, temporada : Temporada ) {
    return this.simpleUpdate( "temporadas", id, temporada );
  }

  public delTemporada( temporadaId: string ) {
    return this.simpleDel( "temporadas", temporadaId );
  }

  public getUsuario(clause?: QueryConstraint | string): Promise<any> {
    return this.simpleQuery("usuarios", clause);
  }

  public getUsuarioRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "usuarios", id );
  }

  public usuarioSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("usuarios", clause );
  }

  public addUsuario( usuario : Usuario, id: string = null ) {
    return this.simpleAdd( "usuarios", usuario, id );
  }

  public updateUsuario( id : string, usuario : Usuario ) {
    return this.simpleUpdate( "usuarios", id, usuario );
  }

  public delUsuario( userId: string ) {
    return this.simpleDel( "usuarios", userId );
  }

  public getEstadJugador(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("estadJugadores", clause);
  }

  public getEstadJugadorRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "estadJugadores", id );
  }

  public estadJugadorSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("estadJugadores", clause );
  }

  public addEstadJugador( estadJugador : EstadJugador, id:string = null ) {
    return this.simpleAdd( "estadJugadores", estadJugador, id );
  }

  public updateEstadJugador( id : string, estadJugador : EstadJugador ) {
    return this.simpleUpdate( "estadJugadores", id, estadJugador );
  }

  public delEstadJugador( estadJugadorId: string ) {
    return this.simpleDel( "estadJugadores", estadJugadorId );
  }

  public getEstadPartidos(clause?: QueryConstraint | string | null): Promise<any> {
    return this.simpleQuery("estadPartidos", clause);
  }

  public getEstadPartidosRef( id : string ): DocumentReference<DocumentData>  {
    return this.asRef( "estadPartidos", id );
  }

  public estadPartidosSub( clause?: QueryConstraint | string ) : Observable<any> {
    return this.simpleQuerySub("estadPartidos", clause );
  }

  public addEstadPartidos( estadPartido : EstadPartido, id:string = null ) {
    return this.simpleAdd( "estadPartidos", estadPartido, id );
  }

  public updateEstadPartidos( id: string, estadPartido : EstadPartido ) {
    return this.simpleUpdate( "estadPartidos", id, estadPartido );
  }

  public delEstadPartidos( estadPartidoId: string ) {
    return this.simpleDel( "estadPartidos", estadPartidoId );
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
  
    // if there aren't enough properties, add a random number at the end of the identifier
    s += ' ' + Math.floor(Math.random() * 100000).toString();
    
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


