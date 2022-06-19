import { PasoDatosService } from './../services/paso-datos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modo-jugador',
  templateUrl: './modo-jugador.page.html',
  styleUrls: ['./modo-jugador.page.scss'],
})
export class ModoJugadorPage implements OnInit {
  listaInicial: [];
  listaBanquillo: [];
  nombres= {
    casa: 'B. M. LAGUNA',
    fuera: 'SAN AGUSTÍN'
  };

  marcador= {
    nuestro: 0,
    rival: 0,
  };

  constructor(private router: Router,
    private pasoDatos: PasoDatosService) { }

  ngOnInit() {
    this.pasoDatos.$getListaInicial.subscribe(data => this.listaInicial = data).unsubscribe();
    this.pasoDatos.$getListaBanquillo.subscribe(data => this.listaBanquillo = data).unsubscribe();
  }

  cambiarModo(){
    this.router.navigate(['/modo-accion']);
  }
}
