import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Partido } from '../modelo/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private firestore: Firestore) { }

  getPartidos(equipoId: string): Observable<Partido[]>{
    const partidoRef = query(collection(this.firestore, 'partidos'), where('equipoId', '==', equipoId));
    return collectionData(partidoRef, {idField: 'id'}) as Observable<Partido[]>;
  }

}

