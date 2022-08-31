import { Subscription } from 'rxjs';
import { PartidosService } from './../../services/partidos.service';
import { UsuarioService } from './../../services/usuario.service';
import { PasoDatosService } from './../../services/paso-datos.service';
import { Acciones, EventosService } from './../../services/eventos.service';
import { Crono } from './../../modelo/crono';
import { CronoService } from './crono.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario';

@Component({
  selector: 'app-crono',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.scss'],
})
export class CronoComponent implements OnInit, OnDestroy {
  tiempo: Crono = {
    encendido: false,
    finParte: false,
    finPartido: false,
    parte: 1,
    segundos: 0
  };

  partes: number;
  segsParte: number;
  usuario: Usuario;
  subUsuario: Subscription;

  constructor(private cronoService: CronoService,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService,
              private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.tiempo = this.cronoService.tiempo;
    this.partes = +localStorage.getItem('partes');
    this.segsParte = +localStorage.getItem('segsParte');

    this.subUsuario = this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
    });
  }

  ngOnDestroy(){
    this.subUsuario?.unsubscribe();
    this.cronoService.reset();
  }

  pulsaCrono(){
    // Si es la primera vez que se pulsa (comienzo de partido) cambiamos el estado
    if (this.tiempo.segundos === 0 && this.tiempo.parte === 1){
      this.usuarioService.setEstadoPartido(localStorage.getItem('partidoId'), 'en curso');
      this.usuarioService.updateUsuario(this.usuarioService.getUsuario());

    // Evento de comienzo de partido
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.comienzoPartido;
    evento.partidoId = localStorage.getItem('partidoId');
    evento.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( evento );
    }

    if (this.tiempo.segundos === 0){
      // Es el comienzo de un periodo
      // Evento de comienzo de periodo
      const evento = this.eventosService.newEvento();
      evento.accionPrincipal = Acciones.comienzoPeriodo;
      evento.partidoId = localStorage.getItem('partidoId');
      evento.equipoId = localStorage.getItem('equipoId');
      this.pasoDatos.onEventoJugador( evento );
    }

    this.tiempo.encendido = !this.cronoService.pasoTiempo();
  }

  pulsaParte(){
    this.tiempo.finParte = true;
    this.tiempo.encendido = false;

    // Evento de fin de parte
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.finPeriodo;
    evento.partidoId = localStorage.getItem('partidoId');
    evento.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( evento );

    if (this.tiempo.parte === this.partes) {
      // Es el final del partido
      this.finPartido();
    } else {
      this.tiempo.parte++;
      this.tiempo.segundos = 0;
      this.tiempo.finParte = false;
    }

  }

  finParte(){

    this.tiempo.parte++;
    this.tiempo.segundos = 0;
    this.tiempo.finParte = false;

    // Evento de fin de parte
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.finPeriodo;
    evento.partidoId = localStorage.getItem('partidoId');
    evento.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( evento );
  }

  finPartido(){
    this.tiempo.finPartido = true;

    // Evento de fin de partido
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.finPartido;
    evento.partidoId = localStorage.getItem('partidoId');
    evento.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( evento );

    // Dejamos el estado del partido como 'finalizado'
    const indiceRol = this.usuario.roles.findIndex(rol => rol.equipo.id === localStorage.getItem('equipoId'));

    const indicePartido = this.usuario.roles[indiceRol].equipo.partidos.
      findIndex(partido => partido.id === localStorage.getItem('partidoId'));

    this.usuario.roles[indiceRol].equipo.partidos[indicePartido].config.estado = 'finalizado';
    this.usuarioService.updateUsuario(this.usuario);
  }
}
