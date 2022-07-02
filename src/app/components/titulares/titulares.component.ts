import { PasoDatosService } from './../../services/paso-datos.service';
import { CronoService } from './../crono/crono.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup, ToastController } from '@ionic/angular';
import { JsonPipe } from '@angular/common';

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
    private crono: CronoService,
    private pasoDatos: PasoDatosService,
    private toastController: ToastController) {
      //console.log('constructor titulares');
     }

  ngOnInit() {
    // divido la lista inicial en portero y jugadores de campo
    /* console.log('ngOninit titulares'); */
    this.jugCampo = this.listaInicial;

    const indice = this.jugCampo?.indexOf(this.jugCampo.find(po => po.posicion === 'PO'));

    if (indice >= 0 ){
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

    /* console.log('Portero: ', this.portero[0]);
    console.log('Titulares: ', this.jugCampo);
    console.log('Banquillo: ', this.listaBanquillo);
    console.log('Excluidos: ', this.listaExcluidos); */

/*     alert(this.jugCampo);
alert(this.portero);
alert(this.listaBanquillo);
 */
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngDoCheck(){
    // Si alguno de los crono de 2 minutos ha llegado a cero,
    // Actualizo los cronos de 2 minutos de exclusión
    /* console.log('ngDoCheck titulares'); */
    if (this.listaExcluidos !== undefined){
      for (let i = 0; i < this.listaExcluidos?.length; i++){
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

  }

  btnGol(jugador: any): void{
    const detalle = {accion: 'gol', idJugador: jugador.id};
    this.pasoDatos.enviaPantallaDetalle(detalle);
    this.router.navigate(['/detalle-jugador']);
  }

  btnGolRival(jugador: any): void{
    const detalle = {accion: 'gol rival', idJugador: jugador.id};
    this.pasoDatos.enviaPantallaDetalle(detalle);
    this.router.navigate(['/detalle-jugador']);
  }

  btnLanzamiento(jugador: any): void{
    const detalle = {accion: 'lanzamiento', idJugador: jugador.id};
    this.pasoDatos.enviaPantallaDetalle(detalle);
    this.router.navigate(['/detalle-jugador']);
  }

  btnParada(jugador: any): void{
    const detalle = {accion: 'parada', idJugador: jugador.id};
    this.pasoDatos.enviaPantallaDetalle(detalle);
    this.router.navigate(['/detalle-jugador']);
  }

  btnAmarilla(jugador: any): void{
    const mensaje = 'Tarjeta amarilla para ' + jugador.nombre;
    this.toastOk(mensaje);
  }

  btnRoja(jugador: any): void{
    /* this.dosMinutos(jugador.numero); */
    const mensaje = 'Tarjeta roja para ' + jugador.nombre;
    this.toastOk(mensaje);
  }

  btnAzul(jugador: any): void{
    /* this.dosMinutos(jugador.numero); */
    const mensaje = 'Tarjeta azul para ' + jugador.nombre;
    this.toastOk(mensaje);
  }

  dosMinutos(numero: any){
    let excluido: any;
    if (this.portero[0]?.numero === numero){
      this.portero[0].exclusion = true;
      this.portero[0].segExclusion += 120;

      // Mandamos al portero a la lista de excluidos
      excluido = this.portero.splice(0,1);
      this.listaExcluidos.push(excluido[0]);
    } else {
      // Jugadores de campo
      for (let i = 0; i < this.jugCampo?.length; i++){
        if (this.jugCampo[i].numero === numero){
          this.jugCampo[i].exclusion = true;
          this.jugCampo[i].segExclusion += 120;

          // Mandamos al jugador a la lista de excluidos
          excluido = this.jugCampo.splice(i,1);
          this.listaExcluidos.push(excluido[0]);
          break;
        }
       }
      // Jugadores ya excluidos
     /*  for (let i = 0; i < this.listaExcluidos?.length; i++){
        if (this.listaExcluidos[i].numero === numero){
          this.listaExcluidos[i].segExclusion += 120;

          // Mandamos al jugador a la lista de excluidos
          excluido = this.listaExcluidos.splice(i,1);
          this.listaExcluidos.push(excluido[0]);
          break;
        }
       } */
      }
      this.crono.setCrono2min(numero);

      const mensaje = '2 minutos para ' + excluido[0].nombre;
      this.toastOk(mensaje);

    }

    btnCambio(titular: any, cambio: any, esPortero: any){
      let jugSale: any;

      if (esPortero){
        jugSale = this.portero.splice(0,1);

      } else {
        const sale = this.jugCampo.findIndex(res => res.id === titular);
        jugSale = this.jugCampo.splice(sale, 1);
      }
      // Cambio en las listas

      const entra = this.listaBanquillo.findIndex(res => res.id === cambio);
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

      const mensaje = 'Sale ' + jugSale[0].nombre + ' y entra ' + jugEntra[0].nombre;
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
