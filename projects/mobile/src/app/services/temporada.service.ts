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


@Injectable({
  providedIn: 'root'
})
export class TemporadaService {

  private temporadaRef : CollectionReference<DocumentData>;

  constructor( private firestore : Firestore ){
    this.temporadaRef = collection( this.firestore, 'temporadas' );
  }

  async getTemporadas( alias? : string ): Promise<QuerySnapshot<DocumentData>>{
    if( alias ){
      return getDocs( query( this.temporadaRef, where( 'alias', '==', alias ) ) );
    }else{
      return getDocs( query( this.temporadaRef ) );
    }
  }

  async addTemporada( temporada : Temporada ){
    return setDoc( doc( this.temporadaRef, temporada.alias ), temporada );
  }

  async getTemporadaByRef( equipoRef : DocumentReference<DocumentData> ){
    return getDoc( equipoRef );
  }

  async getTemporadaById( temporadaId : string ){
    let docRef = doc( this.temporadaRef, temporadaId );
    return getDoc( docRef );
  }

}





