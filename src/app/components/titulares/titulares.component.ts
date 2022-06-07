import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})

export class TitularesComponent implements OnInit {
  titulares= [
    {
      numero: '55',
      nombre: 'Mario Palomo',
      portero: true,
    },
    {
      numero: '39',
      nombre: 'Santi Luna',
      portero: false,
    },
    {
      numero: '12',
      nombre: 'Javier de la Torre',
      portero: false,
    },
    {
      numero: '28',
      nombre: 'César Vitores',
      portero: false,
    },
    {
      numero: '29',
      nombre: 'Alex',
      portero: false,
    },
    {
      numero: '38',
      nombre: 'Gabri',
      portero: false,
    },
    {
      numero: '58',
      nombre: 'Óscar Otero',
      portero: false,
    },
  ];

  listaRobos= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Intercepción'}, {nombre: 'Otros'}];
  listaPerdidas= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Pasos'}, {nombre: 'Dobles'}, {nombre: 'Otros'}];

  ev: Event;

  constructor(private router: Router) { }

  ngOnInit() {}

  irADetalle(){
    this.router.navigate(['/detalle-jugador']);
  }
}
