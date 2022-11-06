import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';


import { LoginService } from './login.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario : { email: string,
              password: string };

  constructor(private menu: MenuController,
    private loginService: LoginService,
    private router: Router,
    private toastController: ToastController) { 
    if( environment.production ) {
      this.usuario = {
        email : '', 
        password : ''
      };
    }else{
      this.usuario = {
        email : 'ajvitores@gmail.com',
        password : '123456'
      }
    }
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  login(){
    /* this.loginService.comprobarLogin(this.usuario); */
    this.loginService.login(this.usuario)
    .then(response => {
      console.log(response.user.email);
      this.toastCorrecto();

      localStorage.setItem('emailUsuario', response.user.email);
      /*localStorage.setItem('emailUsuario', usuarioEncontrado.email); */

      this.activarMenu();
      this.router.navigate(['/home']);
    })
    .catch(error => alert('No existe el usuario o clave erronea.'));
  }

  async toastCorrecto(){
    const toast = await this.toastController.create({
      message: 'Usuario correcto',
      duration: 1000,
      position: 'middle'
    });

    toast.present();
  }

  activarMenu(){
    this.menu.enable(true);
  }

  desactivarMenu(){
    this.menu.enable(false);
  }

}

