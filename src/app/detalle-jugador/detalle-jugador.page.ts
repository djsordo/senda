import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {

  area_campo : string = '';
  area_porteria : string = '';

  constructor(  ) {}

  ngOnInit() {}

  public onCampoClicked( event : string ){
    console.log("onAreaClicked: " );
    this.area_campo = event;
  }

  public onPorteriaClicked( event : string ){
    console.log('onPorteriaclicked');
    this.area_porteria = event; 
  }
}
