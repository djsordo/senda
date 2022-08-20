import { UsuarioService } from './../../services/usuario.service';
import { PasoDatosService } from './../../services/paso-datos.service';
import { Acciones, EventosService } from './../../services/eventos.service';
import { Crono } from './../../modelo/crono';
import { CronoService } from './crono.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario';

@Component({
  selector: 'app-crono',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.scss'],
})
export class CronoComponent implements OnInit {
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

  constructor(private cronoService: CronoService,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService,
              private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.tiempo = this.cronoService.tiempo;
    this.partes = +localStorage.getItem('partes');
    this.segsParte = +localStorage.getItem('segsParte');

    this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }

  pulsaCrono(){
    this.tiempo.encendido = !this.cronoService.pasoTiempo();
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
    console.log(this.usuario);
    const indiceRol = this.usuario.roles.findIndex(rol => rol.equipo.id === localStorage.getItem('equipoId'));
    console.log('Índice Rol: ', indiceRol);
    const indicePartido = this.usuario.roles[indiceRol].equipo.partidos.
      findIndex(partido => partido.id === localStorage.getItem('partidoId'));
    console.log('Índice Partido: ', indicePartido);
    this.usuario.roles[indiceRol].equipo.partidos[indicePartido].config.estado = 'finalizado';
    this.usuarioService.updateUsuario(this.usuario);
  }
}
