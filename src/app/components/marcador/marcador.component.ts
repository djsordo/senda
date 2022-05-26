import { CronoService } from './../crono/crono.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.scss'],
})
export class MarcadorComponent implements OnInit {
  encendido = false;
  constructor(private cronoService: CronoService) { }

  ngOnInit() {
    this.encendido = !this.cronoService.tiempo.encendido;
  }

  tiempoMuerto(){
    this.cronoService.tiempo.encendido = false;
    this.encendido = false;
  }
}
