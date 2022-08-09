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
    parte: 1,
    segundos: 0
  };

  constructor(private cronoService: CronoService) {

   }

  ngOnInit() {
    this.tiempo = this.cronoService.tiempo;
  }

  pulsaCrono(){
    this.tiempo.encendido = !this.cronoService.pasoTiempo();
  }
}
