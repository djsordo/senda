import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modo-accion',
  templateUrl: './modo-accion.page.html',
  styleUrls: ['./modo-accion.page.scss'],
})
export class ModoAccionPage implements OnInit {
  nombres= {
    casa: 'B. M. LAGUNA',
    fuera: 'SAN AGUSTÍN'
  };

  marcador= {
    nuestro: 0,
    rival: 0,
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cambiarModo(){
    this.router.navigate(['/modo-jugador']);
  }

}
