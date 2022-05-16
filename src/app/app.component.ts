import { Component, OnInit } from '@angular/core';
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
    nombre: localStorage.getItem('nombreUsuario'),
    email: localStorage.getItem('emailUsuario'),
  };
  constructor() {
  }
}
