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

  constructor(private toastController: ToastController,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService) {}

  ngOnInit() {}

  eleccion(accion2: any, accion1: any){
    const eventoJugador = this.eventosService.newEvento();

    localStorage.setItem('jugadorId', this.jugador.datos.id);
    if (accion1 === 'Robo'){
      localStorage.setItem('accion', Acciones.robo);
      eventoJugador.accion = Acciones.robo;
    } else if (accion1 === 'Pérdida'){
      localStorage.setItem('accion', Acciones.perdida);
      eventoJugador.accion = Acciones.perdida;
    }

    eventoJugador.jugador = this.jugador;
    this.pasoDatos.onEventoJugador( eventoJugador );

    console.log(accion1);
    console.log(accion2);
  }

/*   async toastElegido(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  } */
}
