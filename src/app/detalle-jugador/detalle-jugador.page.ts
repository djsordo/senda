import { Crono } from './../modelo/crono';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { PasoDatosService } from '../services/paso-datos.service';
import { BalonmanoService, PosicionCampo, PosicionPorteria } from '../services/balonmano.service';
import { Acciones, EventosService } from '../services/eventos.service';
import { TradService } from '../services/trad.service';
import { EstadJugador } from '../modelo/estadJugador';


@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {
  detalle: any;

  public areaCampo = '';
  public areaPorteria = '';
  private accion: Acciones = null;
  private jugador: EstadJugador = null;
  private marcaTiempo: Crono = null;


  constructor(private toastController: ToastController,
    private router: Router,
    private pasoDatos: PasoDatosService,
    public balonmanoService: BalonmanoService,
    private eventosService: EventosService,
    private trad: TradService,
    ) {}

  ngOnInit() {
    this.accion = this.pasoDatos.getPantalla('detalle-jugador').accion;
    this.jugador = this.pasoDatos.getPantalla('detalle-jugador').jugador;
    this.marcaTiempo = this.pasoDatos.getPantalla('detalle-jugador').marcaTiempo;
  }

  public onCampoClicked( event: string ){
    console.log( 'campo: ', event );
    this.areaCampo = event;
  }

  public onPorteriaClicked( event: string ){
    console.log( 'porteria: ', event );
    this.areaPorteria = event;
  }

  btnOk(){
    const eventoJugador = this.eventosService.newEvento();
    eventoJugador.crono = this.marcaTiempo;
    eventoJugador.accionPrincipal = this.accion;
    eventoJugador.jugadorId = this.jugador.datos.id;
    eventoJugador.partidoId = localStorage.getItem('partidoId');
    eventoJugador.equipoId = localStorage.getItem('equipoId');
    eventoJugador.creadorEvento = this.jugador.datos.nombre;
    eventoJugador.posicionCampo = this.areaCampo;
    eventoJugador.posicionPorteria = this.areaPorteria;
    this.pasoDatos.onEventoJugador( eventoJugador );
    localStorage.setItem('accion', this.accion);
    localStorage.setItem('jugadorId', this.jugador.datos.id);

    this.router.navigate(['/modo-jugador']);
  }

  public getTituloPagina() {
    try{
      return `${this.trad.t(this.accion)} de ${this.jugador.datos.nombre}`;
    }catch( error ) {
      return 'Registra la acción del jugador';
    }
  }

  public getCampoName(): string {
    const polygon = this.balonmanoService.campo.polygons.filter(
        polygon => polygon.id === <PosicionCampo> this.areaCampo );
    if( polygon.length ){
      return polygon[0].name.es[0];
    } else {
      return '';
    }
  }

  public getPorteriaName( ): string{
    const polygon = this.balonmanoService.porteria.polygons.filter(
      polygon => polygon.id === <PosicionPorteria> this.areaPorteria );
    if( polygon.length ){
      return polygon[0].name.es[0];
    } else {
      return '';
    }
  }

  public getJugador(){
    return this.jugador.datos.nombre;
  }

}
