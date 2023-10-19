import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

import { environment } from '../../environments/environment';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario= {
    email: '',
    password: ''
  };

  constructor(private menu: MenuController,
    private securityService: SecurityService,
    private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  login(){
    this.securityService.login(this.usuario)
    .then(response => {
      
      this.toast("Login correcto");

      this.activarMenu();
      this.router.navigate(['/home']);
    })
    .catch(error => {
      console.log(error);
      alert('No existe el usuario o clave erronea. ' + error.code + ' - ' + error.message)
    });
  }

  async toast( message : string ){
    const toast = await this.toastController.create({
      message: message,
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

