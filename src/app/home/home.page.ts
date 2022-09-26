import { BDGeneralService } from './../services/bdgeneral.service';

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

  cambioEq: string;
  cambioFe: string;

  fechaActual: Date;
  fIniSemana: Date;
  fFinSemana: Date;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private pasoDatosService: PasoDatosService,
              private bdGeneralService: BDGeneralService
              ) {
  }


  ngOnInit() {
    this.partidos = [];

    this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      this.usuarioService.setUsuario(this.usuario);
    });

    this.cambioEq = this.usuario?.roles[0].equipo.id;
    this.cambioFe = 'proximos';

    this.fechaActual = new Date();
    console.log('Fecha actual: ', this.fechaActual);

    this.fIniSemana = new Date();
    this.fIniSemana.setDate(this.fIniSemana.getDate() - (this.fechaActual.getDay() < 1 ? 6 : (this.fechaActual.getDay()-1)));
    this.fIniSemana.setHours(0);
    this.fIniSemana.setMinutes(0);
    this.fIniSemana.setSeconds(0);
    console.log('Fecha del primer día de la semana: ', this.fIniSemana);

    this.fFinSemana = new Date();
    this.fFinSemana.setDate(this.fFinSemana.getDate() + (this.fechaActual.getDay() < 1 ? 0 : (6 - (this.fechaActual.getDay()-1))));
    this.fFinSemana.setHours(23);
    this.fFinSemana.setMinutes(59);
    this.fFinSemana.setSeconds(59);
    console.log('Fecha del último día de la semana: ', this.fFinSemana);
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
        partido.config.estado = 'en preparacion';
        this.usuarioService.updateUsuario(this.usuario);

        this.subs.forEach(sub => sub.unsubscribe());
        this.router.navigate(['/inicio-sel-jugadores']);

    } else if (modo === 'ver'){
      this.subs.forEach(sub => sub.unsubscribe());
      this.router.navigate(['/modo-ver']);

    } else if (modo === 'reset'){
      // A ver si puedo desde aquí cambiar el estado del partido.
      partido.config.estado = 'programado';
      this.usuarioService.updateUsuario(this.usuario);
      this.subs = this.bdGeneralService.resetPartido(partido.id);
    }
  }

  cambioEquipo(ev: any){
    this.cambioEq = ev.detail.value;
  }

  cambioFecha(ev: any){
    this.cambioFe = ev.detail.value;
  }

  ngOnDestroy(){
    console.log('ngOndestroy');
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
