import { PasoDatosService } from './../services/paso-datos.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { UsuarioService } from './../services/usuario.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { Partido } from '../modelo/partido';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: Usuario;
  partidos: Partido[];

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private pasoDatosService: PasoDatosService
              ) {
  }


  ngOnInit() {
    this.partidos = [];

    this.usuarioService.getUsuario(localStorage.getItem('emailUsuario'))
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });
  }

  irAModo(equipoId: string){
    /* this.router.navigate(['/modo-jugador']); */
    this.pasoDatosService.setEquipoId(equipoId);
    this.router.navigate(['/inicio-sel-jugadores']);
  }

}
