import { PasoDatosService } from './../../services/paso-datos.service';
import { Acciones, EventosService } from 'src/app/services/eventos.service';
import { MarcadorService } from './../marcador/marcador.service';
import { CronoService } from './../crono/crono.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.scss'],
})
export class MarcadorComponent implements OnInit, DoCheck {
  @Input() nombreEquipo: string;
  @Input() nosotros: boolean;

  marcador: number;
  encendido: boolean;

  constructor(private cronoService: CronoService,
              private marcadorService: MarcadorService,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService) {
   }

  ngOnInit() {
    this.encendido = this.cronoService.getEncendido();
    this.marcador = this.marcadorService.getMarcador(this.nosotros);
  }

  ngDoCheck(){
    // Esta es una parte del ciclo de vida de Angular, que se ejecuta 'de vez en cuando' y lo uso para actualizar ciertas variables.
    this.encendido = this.cronoService.getEncendido();
    this.marcador = this.marcadorService.getMarcador(this.nosotros);
  }

  dosMinRival(){
    // Se crea el evento para la base de datos
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.dosMinutosRival;
    evento.creadorEvento = this.nombreEquipo;
    evento.partidoId = localStorage.getItem('partidoId');
    evento.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( evento );
  }

  tiempoMuerto(){
    this.cronoService.apagar();

    // Se crea el evento para la base de datos
    const evento = this.eventosService.newEvento();
    if (this.nosotros){
      evento.accionPrincipal = Acciones.tm;
    } else {
      evento.accionPrincipal = Acciones.tmRival;
    }
    evento.creadorEvento = this.nombreEquipo;
    evento.partidoId = localStorage.getItem('partidoId');
    evento.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( evento );
  }
}
