// Aquí van funciones de Base de Datos que afectan a varias colecciones
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';


import { EstadJugadorService } from './../services/estad-jugador.service';
import { EstadPartidoService } from './../services/estad-partido.service';
import { EventosService } from 'projects/mobile/src/app/services/eventos.service';
import { Db } from './db.service';
import { where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BDGeneralService {

  constructor(private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService,
              private estadJugadorService: EstadJugadorService, 
              private db : Db) {}


  /**
   * Borra todas las estadísticas de un partido
   * @param partidoId 
   * @returns 
   */
  resetPartido( partidoId: string ){
    this.db.getEvento( where("partidoId", "==", partidoId ) )
      .then( (eventosList) => {
        for( let evento of eventosList ){
          console.log( "evento que se va a borrar", evento );
          this.db.delEvento( evento.id );
        }
      });

    // Reset del servicio estadPartido
    this.estadPartidoService.reset();

    this.db.getEstadPartidos( where("partidoId", "==", partidoId ) )
      .then( (estadPartidoList) => {
        for( let estadPartido of estadPartidoList ){
          console.log( "estadistica de partido que borramos", estadPartido ); 
          this.db.delEstadPartidos( estadPartido.partidoId ); 
        }
      });

    this.db.getEstadJugador( where("partidoId", "==", partidoId ) )
      .then( (estadJugadorList) =>  {
        for( let estadJugador of estadJugadorList ){
          console.log( "estadisticas de jugador que borramos", estadJugador ); 
          this.db.delEstadJugador( estadJugador.partidoId );
        }
      });
  }

  // Borra todas las estadísticas de un partido
  DEPRECATEDresetPartido(partidoId: string){
    const subs: Subscription[] = [];

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
