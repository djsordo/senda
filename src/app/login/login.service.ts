import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  perfiles = [
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
  ];

  constructor(private router: Router,
              private menu: MenuController,
              private toastController: ToastController) { }

  comprobarLogin(usuario: any){
    console.log('Usuario:', usuario.email);
    console.log('Contraseña:', usuario.password);

    const usuarioEncontrado = this.usuarios.find(res => res.email === usuario.email && res.password === usuario.password);
    console.log('objeto usuario: ', usuarioEncontrado);

    if (usuarioEncontrado) {
      //alert(usuarioEncontrado.nombre + ' ha entrado correctamente.');
      this.toastCorrecto();

      localStorage.setItem('nombreUsuario', usuarioEncontrado.nombre);
      localStorage.setItem('emailUsuario', usuarioEncontrado.email);

      this.activarMenu();
      this.router.navigate(['/home']);
      }
    else {
      alert('No existe el usuario o clave erronea.');
    }

  }

  activarMenu(){
    this.menu.enable(true);
  }

  desactivarMenu(){
    this.menu.enable(false);
  }

  async toastCorrecto(){
    const toast = await this.toastController.create({
      message: 'Usuario correcto',
      duration: 1000,
      position: 'middle'
    });

    toast.present();
  }
}
