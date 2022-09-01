import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Acciones, EventosService } from 'src/app/services/eventos.service';
import { EstadJugador } from '../modelo/estadJugador';
import { Evento } from '../modelo/evento';
import { EstadPartido } from './../modelo/estadPartido';
import { EstadJugadorService } from './../services/estad-jugador.service';
import { EstadPartidoService } from './../services/estad-partido.service';

@Component({
  selector: 'app-modo-ver',
  templateUrl: './modo-ver.page.html',
  styleUrls: ['./modo-ver.page.scss'],
})

export class ModoVerPage implements OnInit, OnDestroy {

  eventos: Array<Evento>;
  estadPartido: Array<EstadPartido>;
  estadJugadores: Array<EstadJugador>;

  listas: Array<{tipo: string; tipo2: string; cabecera: string; lista: Array<EstadJugador>}> = [];

  lineasEv: any;
  subs: Array<Subscription> = [];

  segmentoMostradoP = 'hechos';
  segmentoMostradoS = 'equipo';

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  constructor(private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService,
              private estadJugadorService: EstadJugadorService,
              private router: Router) { }

  ngOnInit() {
    this.eventos = [];
    this.estadPartido = [];
    this.lineasEv = [ {tpEvento: Acciones.gol, tipo: 'evIzquierda', icono: 'football'},
                      {tpEvento: Acciones.parada, tipo: 'evIzquierda', icono: 'accessibility'},
                      {tpEvento: Acciones.robo, tipo: 'evIzquierda', icono: 'thumbs-up'},
                      {tpEvento: Acciones.golRival, tipo: 'evDerecha', icono: 'football'},
                      {tpEvento: Acciones.lanzamiento, tipo: 'evDerecha', icono: 'close'},
                      {tpEvento: Acciones.perdida, tipo: 'evDerecha', icono: 'thumbs-down'},
                      {tpEvento: Acciones.dosMinutos, tipo: 'evDerecha', icono: 'stopwatch', color: 'danger'},
                      {tpEvento: Acciones.dosMinutosRival, tipo: 'evIzquierda', icono: 'stopwatch', color: 'success'},
                      {tpEvento: Acciones.tarjetaAmarilla, tipo: 'evDerecha', icono: 'square', color: 'amarillo'},
                      {tpEvento: Acciones.tarjetaRoja, tipo: 'evDerecha', icono: 'square', color: 'rojo'},
                      {tpEvento: Acciones.tarjetaAzul, tipo: 'evDerecha', icono: 'square', color: 'azul'},
                      {tpEvento: Acciones.tm, tipo: 'evIzquierda', iconoTexto: 'T'},
                      {tpEvento: Acciones.tmRival, tipo: 'evDerecha', iconoTexto: 'T'},
                      {tpEvento: Acciones.entra, tipo: 'evIzquierda', icono: 'arrow-up'},
                      {tpEvento: Acciones.sale, tipo: 'evDerecha', icono: 'arrow-down'},
                      {tpEvento: Acciones.finPartido, tipo: 'evCentro', texto: 'FINAL DEL PARTIDO'},
                      {tpEvento: Acciones.finPeriodo, tipo: 'evCentro', texto: 'FIN DE PERIODO'},
                      {tpEvento: Acciones.comienzoPartido, tipo: 'evCentro', texto: 'COMIENZO DEL PARTIDO'},
                      {tpEvento: Acciones.comienzoPeriodo, tipo: 'evCentro', texto: 'COMIENZO DE PERIODO'},
                    ];

    this.subs.push(this.estadPartidoService.getEstadPartido(localStorage.getItem('partidoId'))
    .subscribe(estadP => {
      this.estadPartido = estadP;
    }));

    this.subs.push(this.estadJugadorService.getEstadJugador(localStorage.getItem('partidoId'))
    .subscribe(estadJ => {
      this.estadJugadores = estadJ;
      this.listas.push({tipo: 'goles', tipo2: '', cabecera: 'Goleadores', lista: [...this.estadJugadores]
        .sort((a, b) => (b.goles - a.goles))});
      this.listas.push({tipo: 'lanzFallados', tipo2: 'goles', cabecera: 'Lanzamientos totales', lista: [...this.estadJugadores]
        .sort((a, b) => ((b.lanzFallados + b.goles) - (a.lanzFallados + a.goles)))});
      this.listas.push({tipo: 'paradas', tipo2: '', cabecera: 'Paradas', lista: [...this.estadJugadores].filter(jug => jug.paradas >0)
        .sort((a, b) => (b.paradas - a.paradas))});
      this.listas.push({tipo: 'golesRival', tipo2: '', cabecera: 'Goles recibidos', lista: [...this.estadJugadores].filter(jug => jug.golesRival > 0)
        .sort((a, b) => (b.golesRival - a.golesRival))});
      this.listas.push({tipo: 'perdidas', tipo2: '', cabecera: 'Pérdidas', lista: [...this.estadJugadores]
        .sort((a, b) => (b.perdidas - a.perdidas))});
      this.listas.push({tipo: 'robos', tipo2: '', cabecera: 'recuperaciones', lista: [...this.estadJugadores]
        .sort((a, b) => (b.robos - a.robos))});
    }));

    this.subs.push(this.eventosService.getEventos(localStorage.getItem('partidoId'))
    .subscribe(evento => {
      this.eventos = evento;

      // Ordenamos por Timestamp del evento.
      this.eventos.sort((a, b) =>
        (a.timestamp < b.timestamp) ? 1 : -1
      );
    }));
    console.log(this.eventos);
  }

  volver(){
    this.subs.forEach(sub => sub.unsubscribe());
    this.router.navigate(['/home']);
  }

  irAListas(){

  }

  ngOnDestroy(): void {
    console.log('ngOndestroy modo ver');
    this.subs.forEach(sub => sub.unsubscribe());
  }

  segmentChangedP(ev: any){
    this.segmentoMostradoP = ev.detail.value;
    this.segmentoMostradoS = 'equipo';
    console.log(this.segmentoMostradoP);
  }

  segmentChangedS(ev: any){
    this.segmentoMostradoS = ev.detail.value;
    console.log(this.segmentoMostradoS);
  }
}
