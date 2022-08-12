import { Component, OnInit } from '@angular/core';
import { AdminClubesPage } from '../admin-clubes.page';

@Component({
  selector: 'clubes-cambio',
  templateUrl: './cambio.component.html',
  styleUrls: ['./cambio.component.scss'],
})
export class CambioComponent implements OnInit {

  nombre : string; 

  constructor( private mainPage : AdminClubesPage ) { }

  ngOnInit() {}

  onClickCrear() {
    console.log("añadimos ", this.nombre, " a la base de datos" );
  }

  onClickCancel() {
    this.mainPage.setCurrentButton( '' );
  }

}
