import { EstadJugador } from 'projects/mobile/src/app/modelo/estadJugador';
import { Firestore,
        collection,
        addDoc,
        doc,
        setDoc,
        collectionData,
        query,
        where,
        deleteDoc,
        QueryFieldFilterConstraint } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    console.log(jugador);
    const path = 'estadJugadores/' + jugador.id;
    //console.log(path);
    const estadJugadorRef = doc(this.firestore, path);
    //console.log(estadJugadorRef);
    return await setDoc(estadJugadorRef, jugador);
  }

  getEstadJugador(partidoId?: string,
                  jugadorId?: string): Observable<EstadJugador[]>{
    let whereClause : QueryFieldFilterConstraint;
    if( partidoId )
      whereClause = where('partidoId', '==', partidoId);
    if( jugadorId )
      whereClause = where('datos.id', '==', jugadorId );
    const estadJugadoresRef = query(collection(this.firestore, 'estadJugadores'), whereClause );
    return collectionData(estadJugadoresRef) as Observable<EstadJugador[]>;
  }

  async deleteEstadJugador(id: string){
    console.log(id);
    const estadJugadorRef = doc(this.firestore, 'estadJugadores/' + id);
    return await deleteDoc(estadJugadorRef);
  }

}
