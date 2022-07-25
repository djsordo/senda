/* eslint-disable @typescript-eslint/member-ordering */
import { Observable } from 'rxjs';
import { UsuarioService } from './../services/usuario.service';
import { PartidosService } from './../services/partidos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuarios: Usuario;

  proximosPartidos: any;
  anterioresPartidos: any;

  constructor(private partidosService: PartidosService,
              private router: Router,
              private usuarioService: UsuarioService
              ) {
  }


  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(usuarios => {
      this.usuarios = usuarios[0];
      console.log(usuarios);
    });

    this.proximosPartidos = this.partidosService.obtenerProximosPartidos();
    this.anterioresPartidos = this.partidosService.obtenerAnterioresPartidos();
  }

  irAModo(){
    /* this.router.navigate(['/modo-jugador']); */
    this.router.navigate(['/inicio-sel-jugadores']);
  }

}
