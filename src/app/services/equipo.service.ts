import { Injectable } from "@angular/core";
import { Firestore,
          addDoc,
          getDoc,
          getDocs,
          CollectionReference,
          collection,
          DocumentData,
          query,
          where,
          deleteDoc,
          DocumentReference} from '@angular/fire/firestore';

import { Equipo } from "../modelo/equipo";


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private equipoRef: CollectionReference<DocumentData>;

  constructor( private firestore : Firestore ){
    this.equipoRef = collection( this.firestore, 'equipos' );
  }

  newEquipo() : Equipo {
    return {} as Equipo;
  }

  async addEquipo( equipo : Equipo ){
    return addDoc( this.equipoRef, equipo );
  }

  async getEquipoByRef( equipoRef : DocumentReference<DocumentData> ){
    return getDoc( equipoRef );
  }

  async getEquipoByName( nombre : string ){
    const q = query( this.equipoRef, where( "nombre", "==", nombre ) );
    return getDocs(q);
  }

  async deleteEquipoByName( nombre : string ){
    const q = query( this.equipoRef, where( "nombre", "==", nombre ));
    let docList = getDocs( q )
      .then( (docList) => {
        docList.forEach( (docRef) => {
          deleteDoc( docRef.ref );
        })
      })
  }

  async deleteEquipoByRef( document : any ){
    return deleteDoc( document );
  }

  async getAllEQuipo(){
    return getDocs( this.equipoRef );
  }

}
