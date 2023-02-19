import { Injectable } from '@angular/core';
import { Firestore, 
        collection, 
        collectionData, 
        query, 
        where, 
        CollectionReference, 
        DocumentData,
        QuerySnapshot } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';

import { Jugador } from '../modelo/jugador';

@Injectable({
  providedIn : 'root'
})
export class JugadoresService {

  jugadoresRef : CollectionReference<DocumentData>;  

  constructor(private firestore: Firestore) {
    this.jugadoresRef = collection( this.firestore, 'jugadores');
/*
  jugadores: Array<Jugador> = [];
    this.jugadores = [
      {id:  '0', numero: '70', nombre: 'Daniel Vaquero',  portero: true, posicion:'', foto: 'SinImagen.jpg'},
      {id:  '1', numero: '10', nombre: 'Mario Palomo',    portero: true, posicion:'', foto: 'SinImagen.jpg'},
      {id:  '2', numero: '25', nombre: 'Adrián González', portero: false, posicion:'', foto: 'Adrian_Gonzalez_Garcia.jpeg'},
      {id:  '3', numero: '16', nombre: 'Javier de Torre', portero: false, posicion:'', foto: 'Javier_de_Torre_Sebastian.jpeg'},
      {id:  '4', numero: '17', nombre: 'Óscar Otero',     portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id:  '5', numero: '45', nombre: 'Daniel Martín',   portero: false, posicion:'', foto: 'Daniel_Martin_Paredes.jpeg'},
      {id:  '6', numero: '03', nombre: 'Adrián Pérez',    portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id:  '7', numero: '53', nombre: 'Alex Garrido',    portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id:  '8', numero: '98', nombre: 'Alejandro Álvarez', portero: false, posicion:'', foto: 'Alejandro_Alvarez_Castro.jpeg'},
      {id:  '9', numero: '39', nombre: 'Jorge Parra',     portero: false, posicion:'', foto: 'Jorge_Parra_Gonzalez.jpeg'},
      {id: '10', numero: '38', nombre: 'Gabriel Barriocanal', portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id: '11', numero: '55', nombre: 'Rodrigo Méndez',  portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id: '12', numero: '47', nombre: 'Álvaro Recio',    portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id: '13', numero: '14', nombre: 'Marcos Alonso',   portero: false, posicion:'', foto: 'Marcos_Alonso_Ulloa.jpeg'},
      {id: '14', numero: '29', nombre: 'Santiago Luna',   portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id: '15', numero: '56', nombre: 'Jesús Hernández', portero: false, posicion:'', foto: 'SinImagen.jpg'},
      {id: '16', numero: '28', nombre: 'César Vitores',   portero: false, posicion:'', foto: 'Cesar_Vitores_Cosmes.jpeg'},
    ];*/
  }

  public newJugador(){
    return {} as Jugador;
  }

  getJugadoresEquipo(equipoId: string): Observable<Jugador[]>{
    const jugadoresRef = query(this.jugadoresRef, where('equipoId', 'array-contains', equipoId));
    return collectionData(jugadoresRef, {idField: 'id'}) as Observable<Jugador[]>;
  }

  async getJugadoresEquipoAsDoc( equipoId : string ): Promise<QuerySnapshot<DocumentData>> {
    return getDocs( query( this.jugadoresRef, where( 'equipoId', 'array-contains', equipoId ) ) );
  }

  async getJugadoresEquipoArray( equipoId : string ): Promise<Jugador[]> {
    return new Promise( (resolve, reject ) => {
      getDocs( query( this.jugadoresRef, where( 'equipoId', 'array-contains', equipoId ) ) )
        .then( ( val : QuerySnapshot<DocumentData> ) => {
          let result : Jugador[] = [];
          for( let doc of val.docs ){
            result.push( { id: doc.id, ...doc.data()} as Jugador );
          }
          resolve( result );
        });
    } );
  }

}
