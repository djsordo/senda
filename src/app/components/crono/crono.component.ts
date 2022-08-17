import { Crono } from './../../modelo/crono';
import { CronoService } from './crono.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crono',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.scss'],
})
export class CronoComponent implements OnInit {
  tiempo: Crono = {
    encendido: false,
    finParte: false,
    finPartido: false,
    parte: 1,
    segundos: 0
  };

  partes: number;
  segsParte: number;

  constructor(private cronoService: CronoService) {}

  ngOnInit() {
    this.tiempo = this.cronoService.tiempo;
    this.partes = +localStorage.getItem('partes');
    this.segsParte = +localStorage.getItem('segsParte');
  }

  pulsaCrono(){
    this.tiempo.encendido = !this.cronoService.pasoTiempo();
  }

  finParte(){
    this.tiempo.parte++;
    this.tiempo.segundos = 0;
    this.tiempo.finParte = false;
  }

  finPartido(){
    this.tiempo.finPartido = true;
  }
}
