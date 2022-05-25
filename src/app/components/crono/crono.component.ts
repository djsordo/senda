import { CronoService } from './crono.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crono',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.scss'],
})
export class CronoComponent implements OnInit {
  tiempo = {
    encendido: false,
    parte: 1,
    minuto: 0,
    segundo: 0
  };

  constructor(private cronoService: CronoService) {
    this.tiempo = this.cronoService.tiempo;
   }

  ngOnInit() {}

  pulsaCrono(){
    this.cronoService.tiempo.encendido = !this.cronoService.tiempo.encendido;
    this.cronoService.pasoTiempo();
  }
}
