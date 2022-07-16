import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavegacionService } from './services/navegacion.service';
import { PasoDatosService } from './services/paso-datos.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', 
      url: '/home', 
      icon: 'home'},
  ];

  usuarioActivo = {
    nombre: '',
    email: '',
  };

  constructor(private menu: MenuController, 
              private navegacion : NavegacionService ) {
  }

  public ngOnInit(): void {
    this.navegacion.init();
  }

  escribeUsuario() {
    console.log('entra');
    this.usuarioActivo = {
      nombre: localStorage.getItem('nombreUsuario'),
      email: localStorage.getItem('emailUsuario'),
    };

  }
}
