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

  public area_campo = '';
  public area_porteria = '';
  private accion: Acciones = null;
  private jugador: EstadJugador = null;

  constructor(private toastController: ToastController,
    private router: Router,
    private pasoDatos: PasoDatosService,
    public balonmanoService: BalonmanoService,
    private eventosService: EventosService,
    private trad: TradService,
    ) {}

  detalle: any;

  ngOnInit() {
    this.accion = this.pasoDatos.getPantalla('detalle-jugador').accion;
    this.jugador = this.pasoDatos.getPantalla('detalle-jugador').jugador;
  }

  public onCampoClicked( event: string ){
    console.log( 'campo: ', event );
    this.area_campo = event;
  }

  public onPorteriaClicked( event: string ){
    console.log( 'porteria: ', event );
    this.area_porteria = event;
  }

  btnOk(){
    let eventoJugador = this.eventosService.newEvento();
    eventoJugador.accion = this.accion;
    eventoJugador.jugador = this.jugador;
    eventoJugador.posicionCampo = this.area_campo;
    eventoJugador.posicionPorteria = this.area_porteria;
    this.pasoDatos.onEventoJugador( eventoJugador );

    this.pasoDatos.setSumaEstad({accion: this.accion, jugadorId: this.jugador.datos.id, suma: true});
    this.router.navigate(['/modo-jugador']);
  }

  public getTituloPagina() {
    try{
      return `${this.trad.t(this.accion)} de ${this.jugador.datos.nombre}`;
    }catch( error ) {
      return "Registra la acción del jugador";
    }
  }

  public getCampoName( ) : string {
    let polygon = this.balonmanoService.campo.polygons.filter(
        polygon => polygon.id === <PosicionCampo> this.area_campo );
    if( polygon.length )
      return polygon[0].name.es[0];
    else
      return '';
  }

  public getPorteriaName( ): string{
    let polygon = this.balonmanoService.porteria.polygons.filter(
      polygon => polygon.id === <PosicionPorteria> this.area_porteria );
    if( polygon.length )
      return polygon[0].name.es[0];
    else
      return '';
  }

  public getJugador(){
    return this.jugador.datos.nombre;
  }

}
