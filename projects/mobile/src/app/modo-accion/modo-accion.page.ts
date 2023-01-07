import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modo-accion',
  templateUrl: './modo-accion.page.html',
  styleUrls: ['./modo-accion.page.scss'],
})
export class ModoAccionPage implements OnInit {
  nombres= {
    casa: '',
    fuera: ''
  };

  marcador= {
    nuestro: 0,
    rival: 0,
  };

  listaRobos= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Intercepción'}, {nombre: 'Otros'}];
  listaPerdidas= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Pasos'}, {nombre: 'Dobles'}, {nombre: 'Otros'}];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cambiarModo(){
    this.router.navigate(['/modo-jugador']);
  }

}
