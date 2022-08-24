import { Injectable } from '@angular/core';
import { Firestore, 
        collection, 
        addDoc, 
        collectionData, 
        query, 
        where, 
        doc, 
        setDoc, 
        CollectionReference, 
        DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


import { Usuario } from './../modelo/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioRef : CollectionReference<DocumentData>;
  usuario: Usuario;

  constructor(private firestore: Firestore) {
    this.usuarioRef = collection(this.firestore, 'usuarios');
/*     this.getUsuario(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    }); */
  }

  addUsuario(usuario: Usuario){
    return addDoc(this.usuarioRef, usuario);
  }

  async updateUsuario(usuario: Usuario){
    const path = 'usuarios/' + usuario.id;
    const usuarioRef = doc(this.firestore, path);
    return await setDoc(usuarioRef, usuario);
  }

  getUsuarioBD(email: string): Observable<Usuario[]>{
    const usuarioRef = query(this.usuarioRef, where('email', '==', email));
    return collectionData(usuarioRef, {idField: 'id'}) as Observable<Usuario[]>;
  }

  getUsuario(){
    return this.usuario;
  }

  setUsuario(usuario: Usuario){
    this.usuario = usuario;
  }
}
