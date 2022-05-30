import { MarcadorService } from './../marcador/marcador.service';
import { CronoService } from './../crono/crono.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.scss'],
})
export class MarcadorComponent implements OnInit, DoCheck {
  @Input() nombreEquipo: string;
  @Input() marcador: number;
  @Input() nosotros: boolean;

  encendido: boolean;

  constructor(private cronoService: CronoService,
             private marcadorService: MarcadorService) {
   }

  ngOnInit() {
    this.encendido = this.cronoService.getEncendido();
    this.marcador = this.marcadorService.getMarcador(this.nosotros);
  }

  ngDoCheck(){
    // Esta es una parte del ciclo de vida de Angular, que se ejecuta 'de vez en cuando' y lo uso para actualizar ciertas variables.
    this.encendido = this.cronoService.getEncendido();
    this.marcador = this.marcadorService.getMarcador(this.nosotros);
  }

  tiempoMuerto(){
    this.cronoService.apagar();
    console.log(this.cronoService.marcaTiempo());
  }
}
