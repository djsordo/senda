import { Injectable } from "@angular/core";
import { collection, 
        CollectionReference,
        doc,
        DocumentData, 
        DocumentReference, 
        Firestore, 
        getDoc,
        query,
        where,
        QuerySnapshot,
        setDoc} from "@angular/fire/firestore";
import { getDocs } from "firebase/firestore";



import { Temporada } from "../modelo/temporada";

/**
 * 
 * @deprecated - use Db service instead
 */
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

}





