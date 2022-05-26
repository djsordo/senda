import { CronoService } from './../crono/crono.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcador',
  templateUrl: './marcador.component.html',
  styleUrls: ['./marcador.component.scss'],
})
export class MarcadorComponent implements OnInit, DoCheck {
  @Input() nombreEquipo: string;

  encendido: boolean;

  constructor(private cronoService: CronoService) {
   }

  ngOnInit() {
    this.encendido = this.cronoService.getEncendido();
    console.log(this.encendido);
  }

  ngDoCheck(){
    // Esta es una parte del ciclo de vida de Angular, que se ejecuta 'de vez en cuando' y lo uso para actualizar ciertas variables.
    this.encendido = this.cronoService.getEncendido();
  }

  tiempoMuerto(){
    this.cronoService.apagar();
    console.log(this.cronoService.marcaTiempo());
  }
}
