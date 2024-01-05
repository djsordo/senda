import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

import { environment } from '../../environments/environment';
import { ErrorInfo, SecurityService } from '../services/security.service';

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
  error : ErrorInfo = null;

  constructor(private menu: MenuController,
    private securityService: SecurityService,
    private router: Router,
    private toastController: ToastController, 
    private alertController: AlertController ) { }

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
    .catch((error : ErrorInfo) => {
      console.log(error);
      this.error = error;
    });
  }

  clearError() : void {
    this.error = null;
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

  deleteMySelf(){
    this.alertController.create({
      header: '¿Seguro?', 
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel'
        }, 
        {
          text: 'Ok', 
          role: 'confirm', 
          handler: () => {
            this.securityService.deleteCurrentLoggedUser()
              .then( () => {
                this.toast("Usuario borrado");
                this.error = null;
              });
          }
        }
      ]
    })
    .then( ( theAlert ) => theAlert.present() );
  }

}

