import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


import { Jugador } from '../modelo/jugador';
import { PasoDatosService } from '../services/paso-datos.service';
import { BalonmanoService } from '../services/balonmano.service';
import { Acciones, EventosService } from '../services/eventos.service';
import { TradService } from '../services/trad.service';


@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {

  private area_campo = '';
  private area_porteria = '';
  private accion: Acciones = null; 
  private jugador: Jugador = null;

  constructor(private toastController: ToastController,
    private router: Router,
    private pasoDatos: PasoDatosService, 
    public balonmanoService : BalonmanoService, 
    private eventosService : EventosService,
    private trad : TradService ) {}

  detalle: any;

  ngOnInit() {
    this.accion = this.pasoDatos.getPantalla("detalle-jugador").accion;
    this.jugador = this.pasoDatos.getPantalla("detalle-jugador").jugador;
  }

  public onCampoClicked( event : string ){
    this.area_campo = event;
  }

  public onPorteriaClicked( event : string ){
    this.area_porteria = event;
  }

  btnOk(){
    let eventoJugador = this.eventosService.newEvento();
    eventoJugador.accion = this.eventosService.getAccionById( this.accion ); 
    eventoJugador.jugador = this.jugador; 
    eventoJugador.posicionCampo = this.area_campo;
    eventoJugador.posicionPorteria = this.area_porteria;
    this.pasoDatos.onEventoJugador( eventoJugador );
    this.router.navigate(['/modo-jugador']);
  }

  public getTituloPagina() {
    try{
      return `${this.trad.t(this.accion)} de ${this.jugador.nombre}`;
    }catch( error ) {
      return "Registra la acción del jugador";
    }
  }

  public getJugador(){
    return this.jugador.nombre;
  }

}
