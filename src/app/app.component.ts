import { MenuController } from '@ionic/angular';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home'},
  ];

  usuarioActivo = {
    nombre: '',
    email: '',
  };

  constructor(private menu: MenuController) {
  }

  escribeUsuario() {
    console.log('entra');
    this.usuarioActivo = {
      nombre: localStorage.getItem('nombreUsuario'),
      email: localStorage.getItem('emailUsuario'),
    };

  }
}
