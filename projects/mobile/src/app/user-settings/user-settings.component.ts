import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings', 
  templateUrl: './user-settings.component.html', 
  styleUrls: [ './user-settings.component.scss' ]
})
export class UserSettingsComponent {

  public passwordChangeResult : string = null;

  constructor( private security : SecurityService, 
               private alertController : AlertController, 
               private router : Router ) {}

  onSubmit( form : NgForm ) {
    
    this.security.cambiarContrasenia( form.controls.newPassword1.value )
    .then( () => this.passwordChangeResult = 'success' )
    .catch( () => this.passwordChangeResult = 'failure' );
  }

  onDeleteAccount() {
    let alert = this.alertController.create({
      header: '¿Seguro?', 
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel', 
          handler: () => { /* do nothing */ }
        },
        {
          text: 'OK', 
          role: 'confirm', 
          handler: () => {
            this.security.deleteCurrentLoggedUser();
            this.security.logout();
            this.router.navigate( ['/'] );
          }
        }
      ]
    })
    .then( alert => alert.present() );
  }

}


