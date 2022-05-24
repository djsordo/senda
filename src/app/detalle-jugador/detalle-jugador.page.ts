import { Component, OnInit } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {

  private element: { nativeElement: any; };

  constructor( ) {}

  ngOnInit() {}

  onPorteriaPan( event : any ){
    console.log( event );
  }

  onClick( event : any ){
    console.log( event );
  }
}
