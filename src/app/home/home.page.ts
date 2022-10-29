import { PartidosEquipo } from './../modelo/partidosEquipo';
import { PartidosService } from 'src/app/services/partidos.service';
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
              private usuarioService: UsuarioService,
              private partidoService: PartidosService,
              private pasoDatosService: PasoDatosService,
              private bdGeneralService: BDGeneralService
              ) {}

  ngOnInit() {
    this.fechaActual = new Date();
    //console.log('Fecha actual: ', this.fechaActual);

    this.fIniSemana = new Date();
    this.fIniSemana.setDate(this.fIniSemana.getDate() - (this.fechaActual.getDay() < 1 ? 6 : (this.fechaActual.getDay()-1)));
    this.fIniSemana.setHours(0);
    this.fIniSemana.setMinutes(0);
    this.fIniSemana.setSeconds(0);
    //console.log('Fecha del primer día de la semana: ', this.fIniSemana);

    this.fFinSemana = new Date();
    this.fFinSemana.setDate(this.fFinSemana.getDate() + (this.fechaActual.getDay() < 1 ? 0 : (6 - (this.fechaActual.getDay()-1))));
    this.fFinSemana.setHours(23);
    this.fFinSemana.setMinutes(59);
    this.fFinSemana.setSeconds(59);
    //console.log('Fecha del último día de la semana: ', this.fFinSemana);

    this.subs.push(this.usuarioService.getUsuarioBD(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      this.usuarioService.setUsuario(this.usuario);

      // Cargamos los partidos de los equipos a los que pertenece el usuario
      this.usuario.roles.forEach(rol => {
        // Por cada rol saco los partidos del equipo
        this.subs.push(this.partidoService.getPartidos(rol.equipo.id)
          .subscribe(partidos => {
            const partidosEquipo: PartidosEquipo = {
              equipoId: rol.equipo.id,
              partidos: {
                anteriores: [],
                programados: [],
                proximos: []
              }
            };

            //console.log('Id del Equipo: ', partidosEquipo.equipoId);
            partidos.forEach(partido => {
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

            //console.log('Partidos del equipo: ', partidosEquipo);
            this.partidos.push(partidosEquipo);

            this.cambioEq = this.usuario?.roles[0].equipo.id;
            this.equipoSelec = this.seleccionEquipo(this.cambioEq);
          })
        );
      });
    }));

    /* this.cambioEq = this.usuario?.roles[0].equipo.id; */
/*     this.cambioEq = 'zJ95IqWhrfJs4AgdGS2i';
    this.equipoSelec = this.seleccionEquipo(this.cambioEq);
 */
    /* this.equipoSelec = this.partidos[0]; */

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

    /* console.log('seleccionEquipo(): ', equipoId); */
    this.partidos.forEach(partido => {
      if (partido.equipoId === equipoId){
        partidosEquipo = partido;
      }
    });

    this.usuario.roles.forEach(rol =>{
      if (rol.equipo.id === equipoId){
        this.equipo = rol.equipo;
      }
    });
    console.log('retorno: ', partidosEquipo);
    return partidosEquipo;
  }

  ngOnDestroy(){
    console.log('ngOndestroy');
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
