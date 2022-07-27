/* eslint-disable @typescript-eslint/member-ordering */
import { UsuarioService } from './../services/usuario.service';
import { PartidosService } from './../services/partidos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';
import { Partido } from '../modelo/partido';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuarios: Usuario;
  partidos: Partido[];

  proximosPartidos: any;
  anterioresPartidos: any;

  constructor(private partidosService: PartidosService,
              private router: Router,
              private usuarioService: UsuarioService
              ) {
  }


  ngOnInit() {
    this.partidos = [];

    this.usuarioService.getUsuario(localStorage.getItem('emailUsuario'))
    .pipe(finalize(() => this.obtenerPartidos()))
    .subscribe(usuarios => {
      this.usuarios = usuarios[0];
      console.log(usuarios);
    });

    this.proximosPartidos = this.partidosService.obtenerProximosPartidos();
    this.anterioresPartidos = this.partidosService.obtenerAnterioresPartidos();
  }

  obtenerPartidos(){
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.usuarios.roles.length; i++ ){
      const equipoId = this.usuarios.roles[i].equipo.equipoId;
      this.partidosService.getPartidos(equipoId).subscribe(partidos => {
        this.partidos = this.partidos.concat(partidos);
        console.log(partidos);
      });
    }
  }

  irAModo(){
    /* this.router.navigate(['/modo-jugador']); */
    this.router.navigate(['/inicio-sel-jugadores']);
  }

}
