import { EstadPartido } from './../modelo/estadPartido';
import { EstadJugador } from 'src/app/modelo/estadJugador';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PasoDatosService } from '../services/paso-datos.service';

@Component({
  selector: 'app-estad-jugador',
  templateUrl: './estad-jugador.page.html',
  styleUrls: ['./estad-jugador.page.scss'],
})
export class EstadJugadorPage implements OnInit {
  jugador: EstadJugador;
  estadPartido: EstadPartido;

  constructor(private location: Location,
              private pasoDatos: PasoDatosService) { }

  ngOnInit() {
    this.jugador = this.pasoDatos.getPantalla('estad-jugador');
    this.estadPartido = this.pasoDatos.getPantalla('estad-partido');
  }

  volver(){
    //this.subs.forEach(sub => sub.unsubscribe());
    this.location.back();
  }

}
