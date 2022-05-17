import { PartidosService } from './../services/partidos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  proximosPartidos: any;
  anterioresPartidos: any;
  constructor(private partidosService: PartidosService) { }

  ngOnInit() {
    this.proximosPartidos = this.partidosService.obtenerProximosPartidos();
    this.anterioresPartidos = this.partidosService.obtenerAnterioresPartidos();
  }


}
