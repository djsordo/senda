import { EventosService } from 'src/app/services/eventos.service';
import { PasoDatosService } from './../services/paso-datos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TradService } from '../services/trad.service';
import { ToastController } from '@ionic/angular';

import { Evento } from '../modelo/evento';
import { MarcadorService } from '../components/marcador/marcador.service';
import { Acciones } from '../services/eventos.service';
import { EstadJugador } from '../modelo/estadJugador';

@Component({
  selector: 'app-modo-jugador',
  templateUrl: './modo-jugador.page.html',
  styleUrls: ['./modo-jugador.page.scss'],
})
export class ModoJugadorPage implements OnInit {
  listaInicial: Array<EstadJugador> = [];
  listaBanquillo: Array<EstadJugador> = [];

  miSuscripcionAEventoJugador: any = null;

  nombres= {
    casa: 'B. M. LAGUNA',
    fuera: 'SAN AGUSTÍN'
  };

  marcador= {
    nuestro: 0,
    rival: 0,
  };

  constructor(private router: Router,
              private toastController: ToastController,
              private pasoDatos: PasoDatosService,
              private marcadorService: MarcadorService,
              private tradService: TradService,
              private eventosService: EventosService) {
    }

  ngOnInit() {
    const listaInicialPrevia = this.pasoDatos.getListaInicial();
    const listaBanquilloPrevia = this.pasoDatos.getListaBanquillo();
    this.nombres = this.pasoDatos.getNombresEquipos();

    listaInicialPrevia.forEach(jugadorPrevia => {
      const jugador = {} as EstadJugador;
      jugador.datos = jugadorPrevia;
      jugador.amarillas = 0;
      jugador.azules = 0;
      jugador.exclusiones = 0;
      jugador.goles = 0;
      jugador.lanzFallados = 0;
      jugador.perdidas = 0;
      jugador.robos = 0;
      jugador.rojas = 0;
      jugador.segExclusion = 0;
      jugador.exclusion = false;
      jugador.exclusiones = 0;
      jugador.paradas = 0;
      jugador.golesRival = 0;
      jugador.segJugados = 0;
      this.listaInicial.push(jugador);
    });
    listaBanquilloPrevia.forEach(jugadorPrevia => {
      const jugador = {} as EstadJugador;
      jugador.datos = jugadorPrevia;
      jugador.amarillas = 0;
      jugador.azules = 0;
      jugador.exclusiones = 0;
      jugador.goles = 0;
      jugador.lanzFallados = 0;
      jugador.perdidas = 0;
      jugador.robos = 0;
      jugador.rojas = 0;
      jugador.segExclusion = 0;
      jugador.exclusion = false;
      jugador.exclusiones = 0;
      jugador.paradas = 0;
      jugador.golesRival = 0;
      jugador.segJugados = 0;
      this.listaBanquillo.push(jugador);
    });
    /* console.log('lista titulares: ',this.listaInicial);
    console.log('listaBanquillo. ', this.listaBanquillo); */
    this.miSuscripcionAEventoJugador =
    this.pasoDatos.suscribirmeAEventoJugador( (evento: Evento) => {
      this.toastOk( this.construyeMensajeEvento(evento) );

      if( evento.accionPrincipal === Acciones.gol ){
        this.marcadorService.gol();
      }
      if( evento.accionPrincipal === Acciones.golRival ){
        this.marcadorService.golRival();
      }

      // Aquí llamo a la función que inserta el evento en la base de datos.
      console.log('Evento que se guardará: ', evento);
      this.eventosService.addEventoBD(evento).then(even => {evento.id = even.id;});
    } );
  }

  cambiarModo(){
    this.router.navigate(['/modo-accion']);
  }

  async toastOk(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

  private construyeMensajeEvento( evento: Evento ){
    if( !evento.posicionCampo && !evento.posicionPorteria ){
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}`;
    }else if( evento.posicionCampo && !evento.posicionPorteria ){
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}\
          desde ${this.tradService.t(evento.posicionCampo)}`;
    }else if( !evento.posicionCampo && evento.posicionPorteria ){
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}\
      hacia ${this.tradService.t(evento.posicionPorteria)}`;
    }else{
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}\
      desde ${this.tradService.t(evento.posicionCampo)} hacia ${this.tradService.t(evento.posicionPorteria)}`;
    }
  }
}
