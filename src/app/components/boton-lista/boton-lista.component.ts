import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton-lista',
  templateUrl: './boton-lista.component.html',
  styleUrls: ['./boton-lista.component.scss'],
})
export class BotonListaComponent implements OnInit {
  @Input() nombreBoton: string;
  @Input() lista: any;
  @Input() numJugador: string;
  @Input() icono: string;
  @Input() colorBoton: string;

  /* listaRobo= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}]; */

  constructor() {}

  ngOnInit() {}

  eleccion(accion2: any, accion1: any){
    console.log(accion1);
    console.log(accion2);
  }
}
