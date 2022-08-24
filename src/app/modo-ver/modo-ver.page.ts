import { Acciones } from './../services/eventos.service';
import { EstadPartidoService } from './../services/estad-partido.service';
import { EstadPartido } from './../modelo/estadPartido';
import { EventosService } from 'src/app/services/eventos.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from '../modelo/evento';


@Component({
  selector: 'app-modo-ver',
  templateUrl: './modo-ver.page.html',
  styleUrls: ['./modo-ver.page.scss'],
})
export class ModoVerPage implements OnInit {
  eventos: Array<Evento>;
  estadPartido: Array<EstadPartido>;

  constructor(private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService) { }

  ngOnInit() {
    this.eventos = [];
    this.estadPartido = [];

    this.estadPartidoService.getEstadPartido(localStorage.getItem('partidoId'))
    .subscribe(estadP => {
      this.estadPartido = estadP;
    });

    this.eventosService.getEventos(localStorage.getItem('partidoId'))
    .subscribe(evento => {
      this.eventos = evento;
      // Ordenamos por Timestamp del evento.
      this.eventos.sort((a, b) =>
        (a.timestamp < b.timestamp) ? 1 : -1
      );
    });
  }

}
