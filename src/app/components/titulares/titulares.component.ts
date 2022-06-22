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
    const indice = this.jugCampo?.indexOf(this.jugCampo.find(po => po.posicion === 'PO'));

    if (indice && indice !== -1 ){
      this.portero = this.jugCampo.splice(indice, 1);
      this.portero[0].exclusion = false;
    }

    this.jugCampo = this.jugCampo?.sort((x,y) => x.numero.localeCompare(y.numero));
    for (let i = 0; i < this.jugCampo?.length; i++){
     this.jugCampo[i].exclusion = false;
    }

    this.listaBanquillo = this.listaBanquillo?.sort((x,y) => x.numero.localeCompare(y.numero));
  }

  irADetalle(): void{
    this.router.navigate(['/detalle-jugador']);
  }

  dosMinutos(numero: any){
    if (this.portero.numero === numero){
      this.portero[0].exclusion = true;
    } else {
      for (let i = 0; i < this.jugCampo?.length; i++){
        if (this.jugCampo[i].numero === numero){
          this.jugCampo[i].exclusion = true;
        }
       }
      }
    console.log(this.portero[0]);
    console.log(this.jugCampo);
  }
}
