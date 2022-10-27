import { Injectable } from '@angular/core';
import { Firestore,
        collection,
        collectionData,
        query,
        where,
        CollectionReference,
        DocumentData,
        doc,
        setDoc,
        onSnapshot,
        WhereFilterOp,
        deleteDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { make_id } from '../services/string-util';
import { Partido } from '../modelo/partido';
import { getDoc, getDocs, QuerySnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  partidoRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.partidoRef = collection( this.firestore, 'partidos' );
  }

  newPartido(){
    return {} as Partido;
  }

  async getPartido( id: string ) {
    const docRef = doc( this.partidoRef, id );
    return getDoc( docRef );
  }

  getPartidos(equipoId: string): Observable<Partido[]>{
    const partidoResult = query(this.partidoRef, where('equipoId', '==', equipoId));
    return collectionData(partidoResult, {idField: 'id'}) as Observable<Partido[]>;
  }

  async getPartidosAsDoc(): Promise<QuerySnapshot<DocumentData>>{
    return getDocs( query( this.partidoRef ) );
  }

  getPartidosCallback( callback,
              field?: string,
              operator?: WhereFilterOp,
              value?: string ){
    let q = null;
    if( field ){
      q = query( this.partidoRef, where( field, operator, value ) );
    }
    else{
      q = query( this.partidoRef );
    }
    return onSnapshot( q, callback );
  }

  addPartido( partido: Partido ){
    return setDoc( doc( this.partidoRef, this.make_id( partido ) ),
                    partido );
  }

  async updatePartido(partido: any, id: string){
    const path = 'partidos/' + id;
    const partidoRef = doc(this.firestore, path);
    return await setDoc(partidoRef, partido);
  }

  setEstado(id: string, estado: string){
    this.getPartido(id)
    .then(part => {
      const partido = part.data();
      partido.config.estado = estado;
      this.updatePartido(partido, id);
    });
  }

  getEstado(id: string){
    let estado: string;
    this.getPartido(id)
    .then(part => {
      const partido = part.data();
      estado = partido.config.estado;
    });
    return estado;
  }

  make_id( partido: Partido ){
    return make_id( partido.temporadaId,
                    partido.equipoId,
                    partido.rival );
  }

  async deletePartidoById( partidoId : string ){
    let docRef = doc( this.partidoRef, partidoId );
    deleteDoc( docRef );
  }

}

