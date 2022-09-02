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
        WhereFilterOp} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { make_id } from '../services/string-util';
import { Partido } from '../modelo/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  partidoRef : CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) { 
    this.partidoRef = collection( this.firestore, 'partidos' );
  }

  newPartido(){
    return {} as Partido;
  }

  addPartido( partido : Partido ){
    return setDoc( doc( this.partidoRef, this.make_id( partido ) ), partido );
  }

  make_id( partido : Partido ){
    return make_id( partido.temporadaId 
            + partido.equipoId
            + partido.rival );
  }

  getPartidos(equipoId: string): Observable<Partido[]>{
    const partidoRef = query(this.partidoRef, where('equipoId', '==', equipoId));
    return collectionData(partidoRef, {idField: 'id'}) as Observable<Partido[]>;
  }

  getPartidosCallback( callback, 
              field? : string, 
              operator? : WhereFilterOp, 
              value? : string ){
    let q = null;
    if( field ) 
      q = query( this.partidoRef, where( field, operator, value ) );
    else 
      q = query( this.partidoRef );
    return onSnapshot( q, callback );
  }

}

