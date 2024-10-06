import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { PartidosEquipo } from './../modelo/partidosEquipo';
import { PartidosService } from 'projects/mobile/src/app/services/partidos.service';
import { BDGeneralService } from './../services/bdgeneral.service';

import { Equipo } from './../modelo/equipo';
import { PasoDatosService } from './../services/paso-datos.service';

import { Usuario } from '../modelo/usuario';
import { Partido } from '../modelo/partido';
import { SecurityService } from '../services/security.service';
import { Db } from '../services/db.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  usuario: Usuario;
  equipo: Equipo;
  equiposUsuario : Equipo[] = [];
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
              private db : Db, 
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


    this.loadEquiposUsuario()
      .then( (allEquipos) => { 
        this.equiposUsuario = allEquipos;
        this.equiposUsuario.forEach(equipo => {
          // Por cada rol saco los partidos del equipo
          this.cambioEq = this.getEquipoIdDefecto();

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
    
              this.partidos.push(partidosEquipo);
    
              this.equipoSelec = this.seleccionEquipo(this.cambioEq);
            })
          );
        });
      });

  }

  irAModo(equipo: Equipo, partido: Partido, modo: string){

    const nombresEquipos = {casa: '', fuera: ''};

    nombresEquipos.casa = equipo.nombreCorto !== undefined ? equipo.nombreCorto : equipo.nombre;
    nombresEquipos.fuera = partido.rival;
    this.pasoDatosService.setNombresEquipos(nombresEquipos);
    if (modo === 'generar'){
        // A ver si puedo desde aquí cambiar el estado del partido.
        partido.config.estado = 'en preparacion';
        this.db.updatePartido( partido.id, partido );
        localStorage.setItem('estadoPartido', partido.config.estado);
        
        this.router.navigate(['/inicio-sel-jugadores', partido.id]);

    } else if (modo === 'ver'){
      this.router.navigate(['/modo-ver', partido.id]);

    } else if (modo === 'reset'){
      // A ver si puedo desde aquí cambiar el estado del partido.
      partido.config.estado = 'programado';
      this.db.updatePartido( partido.id, 
                              { config: { estado: 'programado' }} as Partido, 
                              {merge: true} );
      localStorage.setItem('estadoPartido', partido.config.estado);

      // TODO: AQUI ME QUEDO, PROBANDO A VER SI ME FUNCIONA MI 
      // IMPLEMENTACION DE RESETEAR UN PARTIDO
      // xjx this.subs = this.bdGeneralService.resetPartido(partido.id);
      this.bdGeneralService.resetPartido(partido.id);
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

    this.equiposUsuario.forEach(equipo =>{
      if (equipo.id === equipoId){
        this.equipo = equipo;
      }
    });
    return partidosEquipo;
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private loadEquiposUsuario( ) {
    let roles = this.security.getUsuario('roles');
    if( this.security.userHasRole(["admin"])){
      return this.db.getEquipo( null );
    }else{
      if( roles ){
        let equiposUsuario = [];
        for( let rol of roles ){
          if( 'equipo' in rol )
            equiposUsuario.push( this.db.getEquipo( rol.equipo.id ) );
        }
        return Promise.all( equiposUsuario );
      }
    }
  }

  getEquipoIdDefecto(){
    if( this.equiposUsuario.length > 0 ){
      return this.equiposUsuario[0].id;
    }
    return '';
  }

  userIsAdmin(){
    return this.security.userHasRole( ['admin'] );
  }

}

