import { EstadJugador } from './../../modelo/estadJugador';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup, ToastController } from '@ionic/angular';

import { PasoDatosService } from './../../services/paso-datos.service';
import { CronoService } from './../crono/crono.service';
import { Acciones } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})
export class TitularesComponent implements OnInit {
  @Input() jugCampo: Array<EstadJugador>;
  @Input() listaBanquillo: Array<EstadJugador>;

  /* listaInicial: any; */
  /* listaBanquillo: any; */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('acordeonJugadores', { static: true }) acordeonJugadores: IonAccordionGroup;

  listaExcluidos: Array<EstadJugador> = [];
  portero: Array<EstadJugador> = [];
  /* jugCampo: any; */

  listaRobos= [{nombre: 'Pase'},
              {nombre: 'Falta en ataque'},
              {nombre: 'Intercepción'},
              {nombre: 'Otros'}];
  listaPerdidas= [{nombre: 'Pase'},
              {nombre: 'Falta en ataque'},
              {nombre: 'Pasos'},
              {nombre: 'Dobles'},
              {nombre: 'Otros'}];

  ev: Event;

  constructor(private router: Router,
    private crono: CronoService,
    private pasoDatos: PasoDatosService,
    private toastController: ToastController) {

    }

  ngOnInit() {
    /* this.jugCampo = this.pasoDatos.getListaInicial(); */

    // divido la lista inicial en portero y jugadores de campo
    const indicePortero = this.jugCampo?.indexOf(this.jugCampo.find(po => po.datos.posicion === 'PO'));

    if (indicePortero >= 0 ){
      this.portero = this.jugCampo.splice(indicePortero, 1);
      this.portero[0].exclusion = false;
      /* this.portero[0].segExclusion = 0; */
    }

    this.jugCampo = this.jugCampo?.sort((x,y) => x.datos.numero.localeCompare(y.datos.numero));
    for (let i = 0; i < this.jugCampo?.length; i++){
     this.jugCampo[i].exclusion = false;
     /* this.jugCampo[i].segExclusion = 0; */
    }

    /* this.listaBanquillo = this.pasoDatos.getListaBanquillo()?.sort((x,y) => x.datos.numero.localeCompare(y.datos.numero)); */
    this.listaBanquillo = this.listaBanquillo?.sort((x,y) => x.datos.numero.localeCompare(y.datos.numero));
    /* this.listaExcluidos = []; */

  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngDoCheck(){
    // Si alguno de los crono de 2 minutos ha llegado a cero,
    // Actualizo los cronos de 2 minutos de exclusión
    /* console.log('ngDoCheck titulares'); */
    if (this.listaExcluidos !== undefined){
      for (let i = 0; i < this.listaExcluidos?.length; i++){
        this.listaExcluidos[i].segExclusion = this.crono.getCrono2min(this.listaExcluidos[i].datos.numero).segundos;
        if (this.listaExcluidos[i].segExclusion === 0) {
          this.listaExcluidos[i].exclusion = false;
          this.crono.deleteCrono2min(this.listaExcluidos[i].datos.numero);
          // devolvemos al jugador a la lista de titulares
          const titular = this.listaExcluidos.splice(i,1);
          if (titular[0].datos.posicion === 'PO'){
            this.portero.push(titular[0]);
          } else {
            this.jugCampo.push(titular[0]);
          }
        }
      }
    }
  }


  btnGol(jugador: EstadJugador): void{
    const detalle = {accion: Acciones.gol, jugador};
    this.pasoDatos.setPantalla( 'detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;

  }

  btnGolRival(jugador: EstadJugador): void{
    const detalle = {accion: Acciones.gol_rival, jugador};
    this.pasoDatos.setPantalla( 'detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnLanzamiento(jugador: EstadJugador): void{
    const detalle = {accion: Acciones.lanzamiento, jugador};
    this.pasoDatos.setPantalla( 'detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnParada(jugador: EstadJugador): void {
    const detalle = {accion: Acciones.parada, jugador};
    this.pasoDatos.setPantalla('detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnAmarilla(jugador: any): void{
    const mensaje = 'Tarjeta amarilla para ' + jugador.nombre;
    this.toastOk(mensaje);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnRoja(jugador: any): void{
    /* this.dosMinutos(jugador.numero); */
    const mensaje = 'Tarjeta roja para ' + jugador.nombre;
    this.toastOk(mensaje);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnAzul(jugador: any): void{
    /* this.dosMinutos(jugador.numero); */
    const mensaje = 'Tarjeta azul para ' + jugador.nombre;
    this.toastOk(mensaje);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  dosMinutos(numero: any){
    let excluido: Array<EstadJugador> = [];
    if (this.portero[0]?.datos.numero === numero){
      this.portero[0].exclusion = true;
      this.portero[0].segExclusion = 120;

      // Mandamos al portero a la lista de excluidos
      excluido = this.portero.splice(0,1);
      this.listaExcluidos.push(excluido[0]);
      this.crono.setCrono2min(numero, excluido[0].segExclusion);
    } else {
      // Jugadores de campo
      for (let i = 0; i < this.jugCampo?.length; i++){
        if (this.jugCampo[i].datos.numero === numero){
          this.jugCampo[i].exclusion = true;
          this.jugCampo[i].segExclusion = 120;

          // Mandamos al jugador a la lista de excluidos
          excluido = this.jugCampo.splice(i,1);
          this.listaExcluidos.push(excluido[0]);
          this.crono.setCrono2min(numero, excluido[0].segExclusion);
          break;
        }
       }

      // Jugadores ya excluidos
      if (excluido === undefined) {
        for (let i = 0; i < this.listaExcluidos?.length; i++){
          if (this.listaExcluidos[i].datos.numero === numero){
            this.listaExcluidos[i].segExclusion = this.listaExcluidos[i].segExclusion + 120;

            // Mandamos al jugador a la lista de excluidos
            excluido = this.listaExcluidos.slice(i,i+1);
            console.log(excluido);
            this.crono.sumaCrono2min(numero, 120);
            break;
          }
         }
      }

      }

      const mensaje = '2 minutos para ' + excluido[0].datos.nombre;
      this.toastOk(mensaje);

      // Cerramos el acordeón de jugadores
      this.acordeonJugadores.value = undefined;

  }

  btnCambio(titular: any, cambio: any, esPortero: any){
    let jugSale: any;

    if (esPortero){
      jugSale = this.portero.splice(0,1);

    } else {
      const sale = this.jugCampo.findIndex(res => res.datos.id === titular);
      jugSale = this.jugCampo.splice(sale, 1);
    }
    // Cambio en las listas

    const entra = this.listaBanquillo.findIndex(res => res.datos.id === cambio);
    const jugEntra = this.listaBanquillo.splice(entra, 1);

    //console.log('Entra: ', jugEntra[0]);
    //console.log('Sale: ', jugSale[0]);
    if (esPortero){
      this.portero.push(jugEntra[0]);
    } else {
      this.jugCampo.push(jugEntra[0]);
    }

    this.listaBanquillo.push(jugSale[0]);

    //console.log('Titulares: ', this.jugCampo);
    //console.log('Banquillo: ', this.listaBanquillo);

    const mensaje = 'Sale ' + jugSale[0].nombre + ' y entra ' + jugEntra[0].datos.nombre;
    this.toastOk(mensaje);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  async toastOk(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
