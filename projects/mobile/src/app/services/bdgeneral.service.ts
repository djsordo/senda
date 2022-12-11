// Aquí van funciones de Base de Datos que afectan a varias colecciones

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadJugadorService } from './../services/estad-jugador.service';
import { EstadPartidoService } from './../services/estad-partido.service';
import { EventosService } from 'projects/mobile/src/app/services/eventos.service';
import { UsuarioService } from 'projects/mobile/src/app/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class BDGeneralService {

  constructor(private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService,
              private estadJugadorService: EstadJugadorService,
              private usuarioService: UsuarioService) {}

  // Borra todas las estadísticas de un partido
  resetPartido(partidoId: string){
    const subs: Subscription[] = [];

    // Estado del partido en documento de usuario a 'programado'
    this.usuarioService.setEstadoPartido(partidoId, 'programado');
    this.usuarioService.updateUsuario(this.usuarioService.getUsuario());

    // Borrar eventos relacionados con el partido
    subs.push(this.eventosService.getEventos(partidoId).subscribe(evento => {
      evento.forEach(evBorrar => this.eventosService.deleteEvento(evBorrar.id));
    }));

    // Reset del servicio estadPartido
    this.estadPartidoService.reset();

    // Borrar EstadPartidos relacionados con el partido
    subs.push(this.estadPartidoService.getEstadPartido(partidoId)
    .subscribe(estadP => {
      console.log(estadP);
      estadP.forEach(epBorrar => this.estadPartidoService.deleteEstadPartido(epBorrar.id));
    }));

    // Borrar EstadJugadores relacionados con el partido
    subs.push(this.estadJugadorService.getEstadJugador(partidoId)
    .subscribe(estadJ => {
      console.log(estadJ);
      estadJ.forEach(ejBorrar => this.estadJugadorService.deleteEstadJugador(ejBorrar.id));
    }));

    return subs;
  }
}
