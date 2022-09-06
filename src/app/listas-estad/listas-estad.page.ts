import { PasoDatosService } from './../services/paso-datos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EstadJugador } from '../modelo/estadJugador';

@Component({
  selector: 'app-listas-estad',
  templateUrl: './listas-estad.page.html',
  styleUrls: ['./listas-estad.page.scss'],
})
export class ListasEstadPage implements OnInit {
  listas: Array<{tipo: string; tipo2: string; cabecera: string; lista: Array<EstadJugador>}> = [];
  tipoElegido: string;

  constructor(private router: Router,
              private pasoDatos: PasoDatosService) { }

  ngOnInit() {
    this.listas = this.pasoDatos.getPantalla('listas-estad');
    this.tipoElegido = this.pasoDatos.getPantalla('tipoElegido');
    console.log('Listas: ', this.listas);
    console.log(this.tipoElegido);
  }

  volver(){
    /* this.subs.forEach(sub => sub.unsubscribe()); */
    this.router.navigate(['/modo-ver']);
  }

  cambioLista(ev: any){
    this.tipoElegido = ev.detail.value;
  }
}
