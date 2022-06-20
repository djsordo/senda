import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})
export class TitularesComponent implements OnInit {
  @Input() listaInicial: any;
  @Input() listaBanquillo: any;

  portero: any;
  jugCampo: any;

  listaRobos= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Intercepción'}, {nombre: 'Otros'}];
  listaPerdidas= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Pasos'}, {nombre: 'Dobles'}, {nombre: 'Otros'}];

  ev: Event;

  constructor(private router: Router) { }

  ngOnInit() {
    // divido la lista inicial en portero y jugadores de campo
    this.jugCampo = this.listaInicial;
    console.log('Jugadorres de campo: ', this.jugCampo);
    console.log('Lista Inicial: ', this.listaInicial);
    const indice = this.jugCampo.indexOf(this.jugCampo.find(po => po.posicion === 'PO'));
    console.log('Índice: ',indice);

    if (indice !== -1){
      this.portero = this.jugCampo.splice(indice, 1);
    }

    this.jugCampo = this.jugCampo.sort((x,y) => x.numero.localeCompare(y.numero));
    this.listaBanquillo = this.listaBanquillo.sort((x,y) => x.numero.localeCompare(y.numero));
  }

  irADetalle(): void{
    this.router.navigate(['/detalle-jugador']);
  }
}
