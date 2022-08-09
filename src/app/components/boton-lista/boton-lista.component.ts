import { CronoService } from './../crono/crono.service';
import { Crono } from './../../modelo/crono';
import { EstadJugador } from './../../modelo/estadJugador';
import { PasoDatosService } from './../../services/paso-datos.service';
import { Acciones, EventosService } from 'src/app/services/eventos.service';
import { ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton-lista',
  templateUrl: './boton-lista.component.html',
  styleUrls: ['./boton-lista.component.scss'],
})
export class BotonListaComponent implements OnInit {
  @Input() nombreBoton: string;
  @Input() lista: any;
  @Input() jugador: EstadJugador;
  @Input() icono: string;
  @Input() colorBoton: string;

  marcaTiempo: Crono;

  constructor(private toastController: ToastController,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService,
              private crono: CronoService) {}

  ngOnInit() { }

  btnLista(){
    // establecemos la marca de tiempo
    console.log('entra botonLista');
    this.marcaTiempo = this.crono.marcaTiempo();
  }

  eleccion(accion2: any, accion1: any){
    const eventoJugador = this.eventosService.newEvento();
    eventoJugador.crono = this.marcaTiempo;

    localStorage.setItem('jugadorId', this.jugador.datos.id);
    if (accion1 === 'Robo'){
      localStorage.setItem('accion', Acciones.robo);
      eventoJugador.accionPrincipal = Acciones.robo;
      eventoJugador.accionSecundaria = accion2;
    } else if (accion1 === 'Pérdida'){
      localStorage.setItem('accion', Acciones.perdida);
      eventoJugador.accionPrincipal = Acciones.perdida;
      eventoJugador.accionSecundaria = accion2;
    }

    eventoJugador.jugadorId = this.jugador.datos.id;
    eventoJugador.partidoId = localStorage.getItem('partidoId');
    eventoJugador.equipoId = localStorage.getItem('equipoId');
    eventoJugador.jugador = this.jugador;
    this.pasoDatos.onEventoJugador( eventoJugador );

    console.log(accion1);
    console.log(accion2);
  }

}
