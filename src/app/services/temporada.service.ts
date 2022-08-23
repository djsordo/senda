import { Injectable } from "@angular/core";
import { collection, 
        CollectionReference,
        doc,
        DocumentData, 
        DocumentReference, 
        Firestore, 
        getDoc} from "@angular/fire/firestore";
import { setDoc } from "firebase/firestore";
import { Temporada } from "../modelo/temporada";


@Injectable({
  providedIn: 'root'
})
export class TemporadaService {

  private temporadaRef : CollectionReference<DocumentData>;

  constructor( private firestore : Firestore ){
    this.temporadaRef = collection( this.firestore, 'temporadas' );
  }

  async addTemporada( temporada : Temporada ){
    return setDoc( doc( this.temporadaRef, temporada.alias ), temporada );
  }

  async getTemporadaByRef( equipoRef : DocumentReference<DocumentData> ){
    return getDoc( equipoRef );
  }

}





