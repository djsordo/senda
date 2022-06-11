import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {

  area_campo = '';
  area_porteria = '';

  constructor() {}

  ngOnInit() {}

  public onCampoClicked( event : string ){
    console.log( event );
    this.area_campo = event;
  }

  public onPorteriaClicked( event : string ){
    console.log( event );
    this.area_porteria = event; 
  }
}
