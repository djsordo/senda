import { Injectable } from '@angular/core';
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
          updateDoc,
          DocumentReference,
          DocumentSnapshot,
          doc } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';

import { Equipo } from '../modelo/equipo';
import { make_id } from './string-util';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private equipoRef: CollectionReference<DocumentData>;

  constructor( private firestore: Firestore ){
    this.equipoRef = collection( this.firestore, 'equipos' );
  }

  newEquipo(): Equipo {
    return {} as Equipo;
  }

  async getEquipos( nombre?: string ){
    if( nombre && nombre.trim().length > 0 ){
      return getDocs( query( this.equipoRef, where( 'nombre', '==', nombre.trim() ) ) );
    }else{
      return getDocs( query( this.equipoRef ) );
    }
  }

  async getEquiposClub( clubId?: string ){
    if( clubId && clubId.trim().length > 0 ){
      return getDocs( query( this.equipoRef,  where( 'club.clubId', '==', clubId.trim() ),
                                              where( 'temporada.actual', '==', true) )
                            );
    }else{
      return getDocs( query( this.equipoRef, where( 'club.clubId', '==', '' ) ) );
    }
  }

  async addEquipo( equipo: Equipo ){
    return setDoc( doc( this.equipoRef, this.make_id( equipo ) ), equipo );
    addDoc( this.equipoRef, equipo );
  }

  make_id( equipo: Equipo ){
    return make_id( equipo.nombre,
              equipo.categoria,
              equipo.genero,
              equipo.club.nombre );
  }

  async updateEquipo( docSnap: DocumentSnapshot<DocumentData>,
                      equipo: any ){
    return updateDoc( docSnap.ref, equipo );
  }

  /**
   * @deprecated - use getEquipoById instead
   * @param equipoRef
   * @returns
   */
  async getEquipoByRef( equipoRef: DocumentReference<DocumentData> ){
    return getDoc( equipoRef );
  }

  async getEquipoById( equipoId: string ){
    let docRef = doc( this.equipoRef, equipoId );
    return getDoc( docRef );
  }

  async getEquipoByName( nombre: string ){
    const q = query( this.equipoRef, where( 'nombre', '==', nombre ) );
    return getDocs(q);
  }

  async deleteEquipoByName( nombre: string ){
    const q = query( this.equipoRef, where( 'nombre', '==', nombre ));
    let docList = getDocs( q )
      .then( (docList) => {
        docList.forEach( (docRef) => {
          deleteDoc( docRef.ref );
        });
      });
  }

  async deleteEquipoById( id: string ){
    let docRef = doc( this.equipoRef, id );
    return deleteDoc( docRef );
  }

}
