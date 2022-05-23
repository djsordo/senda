import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modo-jugador',
  templateUrl: './modo-jugador.page.html',
  styleUrls: ['./modo-jugador.page.scss'],
})
export class ModoJugadorPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cambiarModo(){
    this.router.navigate(['/modo-accion']);
  }
}
