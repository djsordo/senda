import { Observable } from 'rxjs';
import { Usuario } from './../modelo/usuario';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firestore: Firestore) {}

  addUsuario(usuario: Usuario){
    const usuarioRef = collection(this.firestore, 'usuarios');
    return addDoc(usuarioRef, usuario);
  }

  getUsuario(email: string): Observable<Usuario[]>{
    /* const usuarioRef = collection(this.firestore, 'usuarios'); */
    const usuarioRef = query(collection(this.firestore, 'usuarios'), where('email', '==', email));
    return collectionData(usuarioRef, {idField: 'id'}) as Observable<Usuario[]>;
  }
}
