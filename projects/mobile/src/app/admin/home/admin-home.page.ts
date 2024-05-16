import { Component, OnInit } from '@angular/core';
import { Db } from '../../services/db.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {


  totalClubes : number;
  totalUsers : number;
  totalEquipos : number;
  totalPartidos : number;
  totalJugadores : number; 


  constructor( private db : Db ) { }

  ngOnInit() {
    this.totalClubes = 0; 
    this.totalUsers = 0; 
    this.totalEquipos = 0;
    this.totalPartidos = 0;
    this.totalJugadores = 0; 
    this.db.getClub()
      .then( clubList => this.totalClubes = clubList.length );
    this.db.getUsuario()
      .then( userList => this.totalUsers = userList.length ); 
    this.db.getEquipo()
      .then( equipoList => this.totalEquipos = equipoList.length );
    this.db.getPartido()
      .then( partidoList => this.totalPartidos = partidoList.length );
    this.db.getJugador()
      .then( jugadorList => this.totalJugadores = jugadorList.length );
  }


}
