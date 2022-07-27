import { Injectable } from '@angular/core';
import { Firestore, 
         collection } from '@angular/fire/firestore';
import { addDoc, 
        CollectionReference,
        DocumentData } from 'firebase/firestore';

import { Partido } from '../modelo/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  private partidoRef : CollectionReference<DocumentData>;

  proximosPartidos = [
    {fecha: '12/06/2022', partido: 'B.M. Laguna vs. San Agustín', lugar: 'Polideportivo Laguna'},
    {fecha: '19/06/2022', partido: 'San Agustín vs. B.M. Laguna', lugar: 'Polideportivo San Agustín'},
  ];

  anterioresPartidos = [
    {fecha: '22/05/2022', partido: 'B.M. Laguna vs. B.M. Castilla', lugar: 'Polideportivo Laguna'},
    {fecha: '29/05/2022', partido: 'B.M. Castilla vs. B.M. Laguna', lugar: 'Polideportivo Canterac'},
  ];

  constructor( private firestore : Firestore ) {
    this.partidoRef = collection( this.firestore, 'partidos' );
  }

  /**
   * Factory de partidos: funcion de conveniencia para crear un objeto partido vacio.
   */
  newPartido() : Partido {
    return {} as Partido;
  }

  async addPartido( partido : Partido ){
    return addDoc( this.partidoRef, partido );
  }

  public obtenerProximosPartidos(){
    return this.proximosPartidos;
  }
  public obtenerAnterioresPartidos(){
    return this.anterioresPartidos;
  }
}
