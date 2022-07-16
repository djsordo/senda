import { PasoDatosService } from './../services/paso-datos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TradService } from '../services/trad.service';
import { ToastController } from '@ionic/angular';

import { Evento } from '../modelo/evento';
import { MarcadorService } from '../components/marcador/marcador.service';
import { Acciones } from '../services/eventos.service';

@Component({
  selector: 'app-modo-jugador',
  templateUrl: './modo-jugador.page.html',
  styleUrls: ['./modo-jugador.page.scss'],
})
export class ModoJugadorPage implements OnInit {
  listaInicial: any;
  listaBanquillo: any;
  miSuscripcionAEventoJugador : any = null;

  nombres= {
    casa: 'B. M. LAGUNA',
    fuera: 'SAN AGUSTÍN'
  };

  marcador= {
    nuestro: 0,
    rival: 0,
  };

  constructor(private router: Router,
              private toastController : ToastController,
              private pasoDatos: PasoDatosService,
              private marcadorService : MarcadorService,
              private tradService : TradService) {
    }

  ngOnInit() {
    this.listaInicial = this.pasoDatos.getListaInicial();
    this.listaBanquillo = this.pasoDatos.getListaBanquillo();

    this.miSuscripcionAEventoJugador = 
    this.pasoDatos.suscribirmeAEventoJugador( (evento : Evento) => {
      this.toastOk( this.construyeMensajeEvento(evento) );
      if( evento.accion.id === Acciones.gol )
        this.marcadorService.gol();
      if( evento.accion.id === Acciones.gol_rival )
        this.marcadorService.golRival();
      } );

/*      if (!this.listaInicial){
      this.pasoDatos.$getListaInicial.subscribe(data => this.listaInicial = data).unsubscribe();
    }
    if (!this.listaBanquillo){
      this.pasoDatos.$getListaBanquillo.subscribe(data => this.listaBanquillo = data).unsubscribe();
    } */
  }

  cambiarModo(){
    this.router.navigate(['/modo-accion']);
  }

  async toastOk(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  private construyeMensajeEvento( evento: Evento ){
    if( !evento.posicionCampo && !evento.posicionPorteria ){
      return `${this.tradService.t(evento.accion.id)} de ${evento.jugador.nombre}`;
    }else if( evento.posicionCampo && !evento.posicionPorteria ){
      return `${this.tradService.t(evento.accion.id)} de ${evento.jugador.nombre}\
          desde ${this.tradService.t(evento.posicionCampo)}`;
    }else if( !evento.posicionCampo && evento.posicionPorteria ){
      return `${this.tradService.t(evento.accion.id)} de ${evento.jugador.nombre}\
      hacia ${this.tradService.t(evento.posicionPorteria)}`;
    }else{
      return `${this.tradService.t(evento.accion.id)} de ${evento.jugador.nombre}\
      desde ${this.tradService.t(evento.posicionCampo)} hacia ${this.tradService.t(evento.posicionPorteria)}`;
    }
  }

}
