import { Observable } from 'rxjs';
import { Usuario } from './../modelo/usuario';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
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

  getUsuario(): Observable<Usuario[]>{
    const usuarioRef = collection(this.firestore, 'usuarios');
    return collectionData(usuarioRef, {idField: 'id'}) as Observable<Usuario[]>;
  }
}
