import { EstadPartidoService } from './../services/estad-partido.service';
import { EventosService } from 'src/app/services/eventos.service';
import { Equipo } from './../modelo/equipo';
import { PasoDatosService } from './../services/paso-datos.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { UsuarioService } from './../services/usuario.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { Partido } from '../modelo/partido';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  usuario: Usuario;
  partidos: Partido[];
  subs: Subscription[] = [];

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private pasoDatosService: PasoDatosService,
              private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService
              ) {
  }


  ngOnInit() {
    this.partidos = [];

    this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
    });

    //this.usuarioService.setUsuario(this.usuario);

  }

  irAModo(equipo: Equipo, partido: Partido, modo){
    // Meto el partidoId y el equipoId en el localStorage, porque los usaré más tarde.
    localStorage.setItem('partidoId', partido.id);
    localStorage.setItem('partes', partido.config.partes.toString());
    localStorage.setItem('segsParte', partido.config.segsParte.toString());
    localStorage.setItem('equipoId', equipo.id);

    // Probablemente pueda quitar esto, ya que el dato está ya en localStorage
    this.pasoDatosService.setEquipoId(equipo.id);

    const nombresEquipos = {casa: '', fuera: ''};

    nombresEquipos.casa = equipo.nombre;
    nombresEquipos.fuera = partido.rival;
    this.pasoDatosService.setNombresEquipos(nombresEquipos);

    if (modo === 'generar'){
        this.subs.forEach(sub => sub.unsubscribe());
        // A ver si puedo desde aquí cambiar el estado del partido.
        partido.config.estado = 'en curso';
        this.usuarioService.updateUsuario(this.usuario);

        this.router.navigate(['/inicio-sel-jugadores']);
      } else if (modo === 'ver'){
        this.subs.forEach(sub => sub.unsubscribe());
        this.router.navigate(['/modo-ver']);

      } else if (modo === 'reset'){
        // A ver si puedo desde aquí cambiar el estado del partido.
        partido.config.estado = 'programado';
        this.usuarioService.updateUsuario(this.usuario);

        // Borrar eventos relacionados con el partido
        this.subs.push(this.eventosService.getEventos(partido.id).subscribe(evento => {
          evento.forEach(evBorrar => this.eventosService.deleteEvento(evBorrar.id));
        }));

        // Borrar EstadPartidos relacionados con el partido
        this.subs.push(this.estadPartidoService.getEstadPartido(partido.id)
        .subscribe(estadP => {
          estadP.forEach(epBorrar => this.estadPartidoService.deleteEstadPartido(epBorrar.id));
        }));
      }
  }

  ngOnDestroy(){
    console.log('ngOndestroy');
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
