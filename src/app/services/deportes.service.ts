import { Injectable } from '@angular/core';
import { Firestore, 
        CollectionReference,
        collection,
        DocumentData, 
        query,
        where,
        getDocs} from '@angular/fire/firestore';

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

}