import { CronoService } from './../crono/crono.service';
import { Component, Input, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})
export class TitularesComponent implements OnInit {
  @Input() listaInicial: any;
  @Input() listaBanquillo: any;
  @ViewChild('acordeonJugadores', { static: true }) acordeonJugadores: IonAccordionGroup;

  listaExcluidos: any;
  portero: any;
  jugCampo: any;

  listaRobos= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Intercepción'}, {nombre: 'Otros'}];
  listaPerdidas= [{nombre: 'Pase'}, {nombre: 'Falta en ataque'}, {nombre: 'Pasos'}, {nombre: 'Dobles'}, {nombre: 'Otros'}];

  ev: Event;

  constructor(private router: Router,
    private crono: CronoService) { }

  ngOnInit() {
    // divido la lista inicial en portero y jugadores de campo
    this.jugCampo = this.listaInicial;
    const indice = this.jugCampo?.indexOf(this.jugCampo.find(po => po.posicion === 'PO'));

    if (indice && indice !== -1 ){
      this.portero = this.jugCampo.splice(indice, 1);
      this.portero[0].exclusion = false;
      this.portero[0].segExclusion = 0;
    }

    this.jugCampo = this.jugCampo?.sort((x,y) => x.numero.localeCompare(y.numero));
    for (let i = 0; i < this.jugCampo?.length; i++){
     this.jugCampo[i].exclusion = false;
     this.jugCampo[i].segExclusion = 0;
    }

    this.listaBanquillo = this.listaBanquillo?.sort((x,y) => x.numero.localeCompare(y.numero));
    this.listaExcluidos = [];

    console.log('ngOnInit');
    console.log('Portero: ', this.portero[0]);
    console.log('Titulares: ', this.jugCampo);
    console.log('Banquillo: ', this.listaBanquillo);
    console.log('Excluidos: ', this.listaExcluidos);
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngDoCheck(){
    // Si alguno de los crono de 2 minutos ha llegado a cero,
    // Actualizo los cronos de 2 minutos de exclusión
    console.log(this.listaExcluidos);
    for (let i = 0; i < this.listaExcluidos?.length; i++){
      if (this.listaExcluidos[i].exclusion){
        this.listaExcluidos[i].segExclusion = this.crono.getCrono2min(this.listaExcluidos[i].numero).segundos;
        if (this.listaExcluidos[i].segExclusion === 0) {
          this.listaExcluidos[i].exclusion = false;
          this.crono.deleteCrono2min(this.listaExcluidos[i].numero);
          // devolvemos al jugador a la lista de titulares
          const titular = this.listaExcluidos.splice(i,1);
          if (titular[0].posicion === 'PO'){
            this.portero.push(titular[0]);
          } else {
            this.jugCampo.push(titular[0]);
          }

        }
      }
    }

    // Lo mismo para el portero
/*     if (this.portero[0].exclusion){
      this.portero[0].segExclusion = this.crono.getCrono2min(this.portero[0].numero).segundos;
      if (this.portero[0].segExclusion === 0) {
        this.portero[0].exclusion = false;
        this.crono.deleteCrono2min(this.portero[0].numero);
      }
    } */
    //console.log(this.crono.cronos2min);
  }


  irADetalle(): void{
    this.router.navigate(['/detalle-jugador']);
  }

  dosMinutos(numero: any){
    if (this.portero[0]?.numero === numero){
      this.portero[0].exclusion = true;
      this.portero[0].segExclusion = 120;

      // Mandamos al portero a la lista de excluidos
      const excluido = this.portero.splice(0,1);
      this.listaExcluidos.push(excluido[0]);
    } else {
      for (let i = 0; i < this.jugCampo?.length; i++){
        if (this.jugCampo[i].numero === numero){
          this.jugCampo[i].exclusion = true;
          this.jugCampo[i].segExclusion = 120;

          // Mandamos al jugador a la lista de excluidos
          const excluido = this.jugCampo.splice(i,1);
          this.listaExcluidos.push(excluido[0]);
          break;
        }
       }
      }
      this.crono.setCrono2min(numero);

      // Cerramos el acordeón de jugadores
      this.acordeonJugadores.value = undefined;

    }

}
