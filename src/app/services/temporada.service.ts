import { Injectable } from "@angular/core";
import { collection, 
        CollectionReference,
        DocumentData, 
        DocumentReference, 
        Firestore, 
        getDoc} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class TemporadaService {

  private temporadaRef : CollectionReference<DocumentData>;

  constructor( private firestore : Firestore ){
    this.temporadaRef = collection( this.firestore, 'temporadas' );
  }

  async getTemporadaByRef( equipoRef : DocumentReference<DocumentData> ){
    return getDoc( equipoRef );
  }

}





