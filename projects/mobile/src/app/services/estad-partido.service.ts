import { Crono } from 'projects/mobile/src/app/modelo/crono';
import { EstadPartido } from './../modelo/estadPartido';
import { Firestore, collection, addDoc, doc, setDoc, collectionData, query, where, deleteDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadPartidoService {
  // estadísticas globales del partido
  estadPartido: EstadPartido = {
    amarillas: 0,
    azules: 0,
    goles: 0,
    golesRival: 0,
    lanzFallados: 0,
    nombreEquipo: null,
    nombreRival: null,
    paradas: 0,
    partidoId: null,
    perdidas: 0,
    robos: 0,
    rojas: 0,
    dosMinutos: 0,
    dosMinutosRival: 0,
    tm: 0,
    tmRival: 0,
    crono: {
      segundos: 0,
      parte: 1,
      encendido: false,
      finParte: false,
      finPartido: false
    }
  };

  constructor(private firestore: Firestore) {}

  // Actualiza un campo dentro de las estadísticas globales
  actualiza(campo: string, valor: any){
    this.estadPartido[campo] = valor;
  }

  // Suma en las estadísticas globales y en la base de datos
  suma(campo: string, crono: Crono){
    this.estadPartido[campo]++;
    this.estadPartido.crono = crono;
    // Actualizamos el registro en la base de datos
    this.updateEstadPartido();
  }

  //Funciones de Base de Datos
  async addEstadPartido(){
    const estadPartidoRef = collection(this.firestore, 'estadPartidos');
    return await addDoc(estadPartidoRef, this.estadPartido);
  }

  async updateEstadPartido(){
    const path = 'estadPartidos/' + this.estadPartido.id;
    const estadPartidoRef = doc(this.firestore, path);
    return await setDoc(estadPartidoRef, this.estadPartido);
  }

  getEstadPartido(partidoId: string): Observable<EstadPartido[]>{
    const estadPartidoRef = query(collection(this.firestore, 'estadPartidos'), where('partidoId', '==', partidoId));
    return collectionData(estadPartidoRef) as Observable<EstadPartido[]>;
  }

  async deleteEstadPartido(id: string){
    console.log(id);
    const estadPartidoRef = doc(this.firestore, 'estadPartidos/' + id);
    return await deleteDoc(estadPartidoRef);
  }

  reset(){
    this.estadPartido = {
      amarillas: 0,
      azules: 0,
      goles: 0,
      golesRival: 0,
      lanzFallados: 0,
      nombreEquipo: null,
      nombreRival: null,
      paradas: 0,
      partidoId: null,
      perdidas: 0,
      robos: 0,
      rojas: 0,
      dosMinutos: 0,
      dosMinutosRival: 0,
      tm: 0,
      tmRival: 0,
      crono: {
        segundos: 0,
        parte: 1,
        encendido: false,
        finParte: false,
        finPartido: false
      }
    };
  }
}
