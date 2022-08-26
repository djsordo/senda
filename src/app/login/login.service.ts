import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
/*   perfiles = [
    {id: '1', nombre: 'entrenador'},
    {id: '2', nombre: 'delegado'},
    {id: '3', nombre: 'director deportivo'},
    {id: '4', nombre: 'directivo'},
    {id: '5', nombre:'invitado'},
  ];

  usuarios = [
    {id: '1', email: 'ajvitores@gmail.com', nombre:'Ángel Vitores', perfilId: '1', password: '12345'},
    {id: '2', email: 'cvitoresc@gmail.com', nombre:'César Vitores', perfilId: '2', password: '12345'},
    {id: '3', email: 'ddep@gmail.com', nombre:'Luis Villanueva', perfilId: '3', password: '12345'},
    {id: '4', email: 'juanjo@gmail.com', nombre:'Juan José Marijuan', perfilId: '4', password: '12345'},
    {id: '5', email: 'invitado@gmail.com', nombre:'Invitado', perfilId: '5', password: '12345'},
  ]; */

  constructor(private auth: Auth) { }

  // esta función registra en firebase auth un usuario con email y password
  registro({ email, password}: any){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
