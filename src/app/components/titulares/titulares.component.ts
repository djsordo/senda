import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})

export class TitularesComponent implements OnInit {
  @Input() listaInicial: any;
  @Input() listaBanquillo: any;

  listaRobos= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Intercepción'}, {nombre: 'Otros'}];
  listaPerdidas= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Pasos'}, {nombre: 'Dobles'}, {nombre: 'Otros'}];

  ev: Event;

  constructor(private router: Router) { }

  ngOnInit() {
    this.listaInicial = this.listaInicial.sort((x,y) => x.numero.localeCompare(y.numero));
    this.listaBanquillo = this.listaBanquillo.sort((x,y) => x.numero.localeCompare(y.numero));
  }

  irADetalle(): void{
    this.router.navigate(['/detalle-jugador']);
  }
}
