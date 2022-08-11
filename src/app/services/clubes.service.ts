import { Injectable } from '@angular/core';
import { Firestore, 
        CollectionReference,
        collection,
        DocumentData, 
        addDoc,
        query,
        where,
        deleteDoc,
        getDocs} from '@angular/fire/firestore';
import { Club } from '../modelo/club';


@Injectable({
  providedIn : 'root'
})
export class ClubesService {

  private clubesRef : CollectionReference<DocumentData>;
  private deportesRef : CollectionReference<DocumentData>;

  constructor( private firestore : Firestore ) {
    this.clubesRef = collection( this.firestore, 'clubs' );
  }

  newClub( ) : Club {
    return {} as Club;
  }

  async getClubes( nombre? : string ){
    if( nombre && nombre.trim().length > 0 ){
      return getDocs( query( this.clubesRef, where( 'nombre', '==', nombre.trim() ) ) );
    }else{
      return getDocs( query( this.clubesRef ) );
    }
  }

  async addClub( nombre : string, deporte : string ){
    return addDoc( this.clubesRef, 
          { nombre : nombre });
  }

  async deleteClubByRef( document : any ){
    return deleteDoc( document );
  } 

  async deleteClubByName( nombre : string ){
    const q = query( this.clubesRef, where( "nombre", "==", nombre ));
    let docList = getDocs( q )
      .then( (docList) => {
        docList.forEach( (docRef) => {
          deleteDoc( docRef.ref );
        })
      })
  }

}

