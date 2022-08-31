import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadPartidoService } from './../services/estad-partido.service';
import { EstadPartido } from './../modelo/estadPartido';
import { Acciones, EventosService } from 'src/app/services/eventos.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Evento } from '../modelo/evento';


@Component({
  selector: 'app-modo-ver',
  templateUrl: './modo-ver.page.html',
  styleUrls: ['./modo-ver.page.scss'],
})
export class ModoVerPage implements OnInit, OnDestroy {
  eventos: Array<Evento>;
  estadPartido: Array<EstadPartido>;
  lineasEv: any;
  subs: Array<Subscription> = [];

  segmentoMostradoP = 'hechos';
  segmentoMostradoS = 'equipo';

  constructor(private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService,
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
