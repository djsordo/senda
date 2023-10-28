import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, takeLast } from 'rxjs/operators';


import { PartidosEquipo } from './../modelo/partidosEquipo';
import { PartidosService } from 'projects/mobile/src/app/services/partidos.service';
import { BDGeneralService } from './../services/bdgeneral.service';

import { Equipo } from './../modelo/equipo';
import { PasoDatosService } from './../services/paso-datos.service';
import { UsuarioService } from './../services/usuario.service';

import { Usuario } from '../modelo/usuario';
import { Partido } from '../modelo/partido';
import { SecurityService } from '../services/security.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  usuario: Usuario;
  equipo: Equipo;
  partidos: PartidosEquipo[] = [];

  equipoSelec: PartidosEquipo = {
    equipoId: '',
    partidos: {
      anteriores: [],
      programados: [],
      proximos: []
      }
    };

  subs: Subscription[] = [];

  cambioEq: string;
  cambioFe = 'proximos';

  fechaActual: Date;
  fIniSemana: Date;
  fFinSemana: Date;

  constructor(private router: Router,
              private security : SecurityService,
              private partidoService: PartidosService,
              private pasoDatosService: PasoDatosService,
              private bdGeneralService: BDGeneralService
              ) {
  }

  ngOnInit() {
    this.fechaActual = new Date();
    
    this.fIniSemana = new Date();
    this.fIniSemana.setDate(this.fIniSemana.getDate() - (this.fechaActual.getDay() < 1 ? 6 : (this.fechaActual.getDay()-1)));
    this.fIniSemana.setHours(0);
    this.fIniSemana.setMinutes(0);
    this.fIniSemana.setSeconds(0);
    
    this.fFinSemana = new Date();
    this.fFinSemana.setDate(this.fFinSemana.getDate() + (this.fechaActual.getDay() < 1 ? 0 : (6 - (this.fechaActual.getDay()-1))));
    this.fFinSemana.setHours(23);
    this.fFinSemana.setMinutes(59);
    this.fFinSemana.setSeconds(59);

    // Cargamos los partidos de los equipos a los que pertenece el usuario
    this.getEquiposUsuario().forEach(equipo => {
      // Por cada rol saco los partidos del equipo
      this.cambioEq = this.getEquiposUsuario()[0].id;
      this.subs.push(this.partidoService.getPartidos(equipo.id)
        .subscribe(partidos => {
          const partidosEquipo: PartidosEquipo = {
            equipoId: equipo.id,
            partidos: {
              anteriores: [],
              programados: [],
              proximos: []
            }
          };

          //console.log('Id del Equipo: ', partidosEquipo.equipoId);
          partidos.forEach(partido => {
            // Si el partido no tiene estado, ponemos "programado"
            try {
              partido.config.estado;
              if (typeof partido.config.estado == "undefined"){
                partido.config.estado = 'programado';
              }
            }
            catch {
              partido.config = {partes:2, segsParte:1800, estado:'programado'};
            }

            // Pongo cada partido en la lista adecuada
            if (partido.fecha.toDate() < this.fIniSemana) {
              // Va a lista de anteriores
              partidosEquipo.partidos.anteriores.push(partido);
            } else if (partido.fecha.toDate() > this.fFinSemana) {
              // Va a lista de programados
              partidosEquipo.partidos.programados.push(partido);
            } else {
              // Va a la lista de próximos
              partidosEquipo.partidos.proximos.push(partido);
            }
          });

          partidosEquipo.partidos.anteriores.sort((a, b) => {
            if (b.fecha.toDate() > a.fecha.toDate()) {
              return 1;
            }
            else {
              return -1;
            }
          });

          partidosEquipo.partidos.programados.sort((a, b) => {
            if (b.fecha.toDate() >= a.fecha.toDate()) {
              return -1;
            }
            else {
              return 1;
            }
          });

          partidosEquipo.partidos.proximos.sort((a, b) => {
            if (b.fecha.toDate() > a.fecha.toDate()) {
              return 1;
            }
            else {
              return -1;
            }
          });

          //console.log('Partidos del equipo: ', partidosEquipo);
          this.partidos.push(partidosEquipo);

          /* this.cambioEq = this.usuario?.roles[0].equipo.id; */
          this.equipoSelec = this.seleccionEquipo(this.cambioEq);
        })
      );
    });

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

    nombresEquipos.casa = equipo.nombreCorto !== undefined ? equipo.nombreCorto : equipo.nombre;
    nombresEquipos.fuera = partido.rival;
    this.pasoDatosService.setNombresEquipos(nombresEquipos);

    if (modo === 'generar'){
        this.subs.forEach(sub => sub.unsubscribe());
        // A ver si puedo desde aquí cambiar el estado del partido.
        partido.config.estado = 'en preparacion';
        this.partidoService.setEstado(partido.id, partido.config.estado);
        /* this.usuarioService.updateUsuario(this.usuario); */
        localStorage.setItem('estadoPartido', partido.config.estado);

        this.subs.forEach(sub => sub.unsubscribe());
        this.router.navigate(['/inicio-sel-jugadores']);

    } else if (modo === 'ver'){
      this.subs.forEach(sub => sub.unsubscribe());
      this.router.navigate(['/modo-ver']);

    } else if (modo === 'reset'){
      // A ver si puedo desde aquí cambiar el estado del partido.
      partido.config.estado = 'programado';
      this.partidoService.setEstado(partido.id, partido.config.estado);
      /* this.usuarioService.updateUsuario(this.usuario);*/
      localStorage.setItem('estadoPartido', partido.config.estado);

      this.subs = this.bdGeneralService.resetPartido(partido.id);
    }
  }

  cambioEquipo(ev: any){
    this.cambioEq = ev.detail.value;
    this.equipoSelec = this.seleccionEquipo(this.cambioEq);
  }

  cambioFecha(ev: any){
    this.cambioFe = ev.detail.value;
  }

  seleccionEquipo(equipoId: string){
    let partidosEquipo: PartidosEquipo = {
      equipoId: '',
      partidos: {
        anteriores: [],
        programados: [],
        proximos: []
      }
    };

    this.partidos.forEach(partido => {
      if (partido.equipoId === equipoId){
        partidosEquipo = partido;
      }
    });

    this.getEquiposUsuario().forEach(equipo =>{
      if (equipo.id === equipoId){
        this.equipo = equipo;
      }
    });
    return partidosEquipo;
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getEquiposUsuario(){
    let equipos = [];
    let roles = this.security.getUsuario('roles');
    if( roles ){
      for( let rol of roles )
      if( 'equipo' in rol ) 
        equipos.push( rol.equipo );
    }
    return equipos;
  }

  getEquipoIdDefecto(){
    if( this.getEquiposUsuario().length > 0 ){
      return this.getEquiposUsuario()[0].id;
    }
    return '';
  }

  userIsAdmin(){
    return this.security.userHasRole( ['admin'] );
  }

}

