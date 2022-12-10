import { EstadJugador } from 'src/app/modelo/estadJugador';
import { Firestore, collection, addDoc, doc, setDoc, collectionData, query, where, deleteDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadPartido } from '../modelo/estadPartido';

@Injectable({
  providedIn: 'root'
})
export class EstadJugadorService {

  constructor(private firestore: Firestore) { }

  //Funciones de Base de Datos
  async addEstadJugador(jugador: EstadJugador){
    const estadJugadorRef = collection(this.firestore, 'estadJugadores');
    return await addDoc(estadJugadorRef, jugador);
  }

  async updateEstadJugador(jugador: EstadJugador){
    const path = 'estadJugadores/' + jugador.id;
    const estadJugadorRef = doc(this.firestore, path);
    return await setDoc(estadJugadorRef, jugador);
  }

  getEstadJugador(partidoId: string): Observable<EstadJugador[]>{
    const estadJugadoresRef = query(collection(this.firestore, 'estadJugadores'), where('partidoId', '==', partidoId));
    return collectionData(estadJugadoresRef) as Observable<EstadJugador[]>;
  }

  async deleteEstadJugador(id: string){
    console.log(id);
    const estadJugadorRef = doc(this.firestore, 'estadJugadores/' + id);
    return await deleteDoc(estadJugadorRef);
  }

}
