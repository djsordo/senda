import { EstadPartido } from './../modelo/estadPartido';
import { EstadJugador } from 'projects/mobile/src/app/modelo/estadJugador';
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

  cadTiempo(segs: number){
    const minutos = Math.floor(segs/60);
    const segundos = segs - minutos*60;

    return (minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0'));
  }

}
