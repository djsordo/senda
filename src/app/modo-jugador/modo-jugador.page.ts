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
    console.log('Pasa por aquí');
    this.listaInicial = this.pasoDatos.getListaInicial();
    this.listaBanquillo = this.pasoDatos.getListaBanquillo();

/*     if (!this.listaInicial){
      this.pasoDatos.$getListaInicial.subscribe(data => this.listaInicial = data).unsubscribe();
    }
    if (!this.listaBanquillo){
      this.pasoDatos.$getListaBanquillo.subscribe(data => this.listaBanquillo = data).unsubscribe();
    } */
  }

  cambiarModo(){
    this.router.navigate(['/modo-accion']);
  }
}
