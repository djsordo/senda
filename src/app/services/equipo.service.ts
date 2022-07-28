import { Injectable } from "@angular/core";
import { Firestore, addDoc, 
          CollectionReference,
          deleteDoc,
          collection,
          DocumentData, 
          query} from '@angular/fire/firestore';
import { Query} from 'firebase/firestore';

import { Equipo } from "../modelo/equipo";


@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private equipoRef : CollectionReference<DocumentData>;

  constructor( private firestore : Firestore ){
    this.equipoRef = collection( this.firestore, 'equipos' );
  }

  newEquipo() : Equipo {
    return {} as Equipo;
  }

  async addEquipo( equipo : Equipo ){
    return addDoc( this.equipoRef, equipo );
  }

  async queryEquipos( nameContains : string ){
    return query( this.equipoRef );
  }

  async deleteEquipo( document : any ){
    return deleteDoc( document );
  }

  async getAllEQuipo(){
    return this.equipoRef;
  }

}





