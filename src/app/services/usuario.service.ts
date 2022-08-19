import { Observable } from 'rxjs';
import { Usuario } from './../modelo/usuario';
import { Firestore, collection, addDoc, collectionData, query, where, doc, setDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;

  constructor(private firestore: Firestore) {
/*     this.getUsuario(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    }); */
  }

  addUsuario(usuario: Usuario){
    const usuarioRef = collection(this.firestore, 'usuarios');
    return addDoc(usuarioRef, usuario);
  }

  async updateUsuario(usuario: Usuario){
    const path = 'usuarios/' + usuario.id;
    const usuarioRef = doc(this.firestore, path);
    return await setDoc(usuarioRef, usuario);
  }

  getUsuarioBD(email: string): Observable<Usuario[]>{
    /* const usuarioRef = collection(this.firestore, 'usuarios'); */
    const usuarioRef = query(collection(this.firestore, 'usuarios'), where('email', '==', email));
    return collectionData(usuarioRef, {idField: 'id'}) as Observable<Usuario[]>;
  }

  getUsuario(){
    return this.usuario;
  }

  setUsuario(usuario: Usuario){
    this.usuario = usuario;
  }
}
