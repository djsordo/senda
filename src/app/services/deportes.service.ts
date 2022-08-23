import { Injectable } from '@angular/core';
import { Firestore, 
        CollectionReference,
        collection,
        DocumentData, 
        query,
        where,
        getDocs,
        getDoc,
        DocumentReference } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';

@Injectable({
  providedIn : 'root'
})
export class DeportesService {

  private deportesRef : CollectionReference<DocumentData>;

  constructor( private firestore : Firestore ) {
    this.deportesRef = collection( this.firestore, 'deportes' );
  }

  async getDeportes( nombre? : string ){
    if( nombre && nombre.trim().length > 0 ){
      return getDocs( query( this.deportesRef, where( 'nombre', '==', nombre.trim() ) ) );
    }else{
      return getDocs( query( this.deportesRef ) );
    }
  }

  async getDocByRef( docRef : DocumentReference<DocumentData> ) {
    return getDoc( docRef );
  }

  async getDocById( idDeporte : string ){
    console.log( this.deportesRef.id );
    let docRef = doc( this.firestore, `/deportes/${idDeporte}` );
    return getDoc( docRef );      
  }

}

