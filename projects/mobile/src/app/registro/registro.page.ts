import { EquipoService } from './../services/equipo.service';
import { ClubesService } from './../services/clubes.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario = {} as Usuario;
  clubes: Promise<any>;
  equiposClub: any[] = [];
  password = '';
  password2 = '';

  clubIdElegido: string;

  constructor(private location: Location,
    private clubesService: ClubesService,
    private equipoService: EquipoService) { }

  ngOnInit() {
    this.clubes = this.clubesService.getClubesAsList();

    this.equipoService.getEquiposClub(this.clubIdElegido)
    .then( (equipoList) => {
      for( const docSnap of equipoList.docs ){
        const equipo = docSnap.data();
        equipo.id = docSnap.id;
        this.equiposClub.push( equipo );
        }
      });
  }

  navAtras(){
    this.location.back();
  }

  cambioLista(ev: any){
    this.clubIdElegido = ev.detail.value;
    this.equiposClub = [];
    this.equipoService.getEquiposClub(this.clubIdElegido)
    .then( (equipoList) => {
      for( const docSnap of equipoList.docs ){
        const equipo = docSnap.data();
        equipo.id = docSnap.id;
        this.equiposClub.push( equipo );
        }
      });
  }
}
