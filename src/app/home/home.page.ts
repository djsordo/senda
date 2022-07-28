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
  usuario: Usuario;
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
    .subscribe(usuarios => {
      this.usuario = usuarios[0];
      console.log('usuario: ', usuarios);
    });

    this.proximosPartidos = this.partidosService.obtenerProximosPartidos();
    this.anterioresPartidos = this.partidosService.obtenerAnterioresPartidos();
  }

  obtenerPartidos(){
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.usuario?.roles.length; i++ ){
      const equipoId = this.usuario.roles[i].equipo.equipoId;
      this.partidosService.getPartidos(equipoId).subscribe(partidos => {
        this.partidos = this.partidos.concat(partidos);
        console.log('Partidos: ', partidos);
      });
    }

  }

  irAModo(){
    /* this.router.navigate(['/modo-jugador']); */
    this.router.navigate(['/inicio-sel-jugadores']);
  }

}
