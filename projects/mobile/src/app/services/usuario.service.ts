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
import { deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';


import { Usuario } from './../modelo/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioRef: CollectionReference<DocumentData>;
  usuario: Usuario;

  constructor(private firestore: Firestore) {
    this.usuarioRef = collection(this.firestore, 'usuarios');
/*     this.getUsuario(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    }); */
  }

  /**
   * factory method para crear usuarios nuevos
   */
  newUsuario(){
    return {} as Usuario;
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

  async getUsuarioById( id: string ) {
    const docRef = doc( this.usuarioRef, id );
    return getDoc( docRef );
  }

  async getUsuarios( nombre?: string ){
    if( nombre && nombre.trim().length > 0 ){
      return getDocs( query( this.usuarioRef, where( 'nombre', '==', nombre.trim() ) ));
    }else{
      return getDocs( query( this.usuarioRef ) );
    }
  }

  getUsuario(){
    return this.usuario;
  }

  setUsuario(usuario: Usuario){
    this.usuario = usuario;
  }

  async deleteUsuarioById( id: string ){
    const docRef = doc( this.usuarioRef, id );
    return deleteDoc( docRef );
  }

  // esta función obtiene el estado de un partido del dodumento del usuario
  getEstadoPartido(partidoId: string){
    let estado = '';
    this.usuario.roles.forEach(rol => {
      const pEncontrado = rol.equipo.partidos?.find(partido => partido.id === partidoId);
      if (pEncontrado){
        estado = pEncontrado.config.estado;
      }
    });

    return estado;
  }

  setEstadoPartido(partidoId: string, estado: string){
    // Esta función establece el estado de un partido en el documento de usuario.
    this.usuario.roles.forEach(rol => {
      const pEncontrado = rol.equipo.partidos?.find(partido => partido.id === partidoId);
      if (pEncontrado) {
        pEncontrado.config.estado = estado;
      }
    });
  }
}