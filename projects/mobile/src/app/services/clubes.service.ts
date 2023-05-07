import { Injectable } from '@angular/core';
import { Firestore,
        CollectionReference,
        collection,
        DocumentData,
        addDoc,
        query,
        where,
        deleteDoc,
        getDocs,
        DocumentSnapshot,
        doc,
        getDoc,
        updateDoc,
        DocumentReference,
        QuerySnapshot} from '@angular/fire/firestore';
import { Club } from '../modelo/club';


@Injectable({
  providedIn: 'root'
})
export class ClubesService {

  private clubesRef: CollectionReference<DocumentData>;

  constructor( private firestore: Firestore ) {
    this.clubesRef = collection( this.firestore, 'clubs' );
  }

  newClub( ): Club {
    return {} as Club;
  }

  async getClubes( nombre?: string ){
    if( nombre && nombre.trim().length > 0 ){
      return getDocs( query( this.clubesRef, where( 'nombre', '==', nombre.trim() ) ) );
    }else{
      return getDocs( query( this.clubesRef ) );
    }
  }

  /**
   * Realiza una consulta de los clubes, se trae los documentos
   * y resuelve la promesa, cargando una lista de clubes.
   *
   * @returns Club[]
   */
  async getClubesAsList( ){
    return new Promise( (resolve) => {
      getDocs( query( this.clubesRef ) )
        .then( ( clubList : QuerySnapshot<DocumentData> ) => {
          let clubesData: Club[] = [];
          for( let clubDoc of clubList.docs ){
            let club = clubDoc.data();
            club.id = clubDoc.id;
            clubesData.push( club as Club );
          }
          resolve( clubesData );
        } )
    } );
  }


  async getClubById( id: string ){
    let docRef = doc( this.clubesRef, id );
    return getDoc( docRef );
  }

  async getDocByRef( docRef : DocumentReference<DocumentData> ) {
    return getDoc( docRef );
  }

  async addClub( nombre : string, deporteId : string ){
    return addDoc( this.clubesRef, {
      nombre : nombre,
      deporteId : deporteId
    })
  }

  async updateClub( docSnap : DocumentSnapshot<DocumentData>,
                    nombre : string ) {
    return updateDoc( docSnap.ref, {
        nombre : nombre
    });
  }

  async deleteClubByRef( document ){
    return deleteDoc( document );
  }

  /**
   * Make a deletion of a document based on the condition given.
   *
   * Example:
   * <code>deleteClubWhere( "nombre", "==", "los fantasiosos" )</code>
   * @param args
   */
  async deleteClubWhere( ...args : any ){
    const q = query( this.clubesRef, where.apply( this, args ));
    let docList = getDocs( q )
      .then( (docList) => {
        docList.forEach( (docRef) => {
          deleteDoc( docRef.ref );
        })
      })
  }

  async deleteClubById( id : string ){
    let docRef = doc( this.clubesRef, id );
    return deleteDoc( docRef );
  }


}
