import { Router } from '@angular/router';
import { EstadPartidoService } from './../../services/estad-partido.service';
import { PasoDatosService } from './../../services/paso-datos.service';
import { Acciones, EventosService } from 'src/app/services/eventos.service';
import { MarcadorService } from './../marcador/marcador.service';
import { CronoService, Tick } from './../crono/crono.service';
import { Component, DoCheck, Input, OnInit, OnDestroy } from '@angular/core';
import { EstadJugador } from 'src/app/modelo/estadJugador';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.scss'],
})
export class MarcadorComponent implements OnInit, DoCheck, OnDestroy {
  @Input() nombreEquipo: string;
  @Input() nosotros: boolean;
  @Input() portero: EstadJugador;

  tickDosMin$: Observable<Tick>;
  subTickDosMin: Subscription;

  marcador: number;
  encendido: boolean;
  dosMinLista: Array<number>;

  constructor(private cronoService: CronoService,
              private marcadorService: MarcadorService,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService,
              private estadPartidoService: EstadPartidoService,
              private router: Router,
              private crono: CronoService) {
   }

  ngOnInit() {
    this.encendido = this.cronoService.getEncendido();
    this.marcador = this.marcadorService.getMarcador(this.nosotros);
    this.dosMinLista = this.marcadorService.getDosMinLista();

    // Observable ticks
    if (!this.nosotros){
      this.tickDosMin$ = this.crono.tickObservable;
      this.subTickDosMin = this.tickDosMin$.subscribe(res => {
        if (res.segundos !== 0){
          for (let i = 0; i < this.dosMinLista.length; i++){
            if (this.dosMinLista[i] !== 0){
              this.dosMinLista[i]--;
            }
          }
          // Borramos los que han llegado a 0
          this.dosMinLista = this.dosMinLista.filter(re => re !== 0);
          }
        });
      }

    }

  ngDoCheck(){
    // Esta es una parte del ciclo de vida de Angular, que se ejecuta 'de vez en cuando' y lo uso para actualizar ciertas variables.
    this.encendido = this.cronoService.getEncendido();
    this.marcador = this.marcadorService.getMarcador(this.nosotros);
  }

  ngOnDestroy(): void {
    this.subTickDosMin?.unsubscribe();
    this.marcadorService.reset();
  }

  dosMinRival(){
    this.dosMinLista.push(120);

    // Se crea el evento para la base de datos
    const evento = this.eventosService.newEvento();
    this.estadPartidoService.suma('dosMinutosRival', evento.crono);

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
      this.estadPartidoService.suma('tm', evento.crono);
      evento.accionPrincipal = Acciones.tm;
    } else {
      this.estadPartidoService.suma('tmRival', evento.crono);
      evento.accionPrincipal = Acciones.tmRival;
    }
    evento.creadorEvento = this.nombreEquipo;
    evento.partidoId = localStorage.getItem('partidoId');
    evento.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( evento );
  }

  btnGolRival(){
    let jugador: EstadJugador;
    if (this.portero === undefined) {
      jugador = null;
    } else {
      jugador = this.portero;
    }

    const detalle = {accion: Acciones.golRival, jugador, marcaTiempo: this.cronoService.marcaTiempo()};
    this.pasoDatos.setPantalla( 'detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);
  }
}
