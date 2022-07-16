import { MarcadorService } from './../marcador/marcador.service';
import { CronoService } from './../crono/crono.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accion-goles-lanz',
  templateUrl: './accion-goles-lanz.component.html',
  styleUrls: ['./accion-goles-lanz.component.scss'],
})
export class AccionGolesLanzComponent implements OnInit {
  
  constructor(private cronoService: CronoService,
    private marcadorService: MarcadorService) { }

  ngOnInit() {}

  btnGol(){
    this.marcadorService.gol();
    console.log('Gol: ', this.cronoService.marcaTiempo());

  }

  btnGolRival(){
    this.marcadorService.golRival();
    console.log('Gol Rival: ', this.cronoService.marcaTiempo());
  }

  btnParada(){
    console.log('Parada: ', this.cronoService.marcaTiempo());
  }

  btnLanzamiento(){
    console.log('Lanzamiento: ', this.cronoService.marcaTiempo());
  }
}
