import { Crono } from './../../modelo/crono';
import { Observable } from 'rxjs';
import { EstadJugador } from './../../modelo/estadJugador';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup, ToastController } from '@ionic/angular';

import { PasoDatosService } from './../../services/paso-datos.service';
import { CronoService, Tick } from './../crono/crono.service';
import { Acciones, EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})
export class TitularesComponent implements OnInit {
  @Input() jugCampo: Array<EstadJugador>;
  @Input() listaBanquillo: Array<EstadJugador>;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('acordeonJugadores', { static: true }) acordeonJugadores: IonAccordionGroup;

  listaExcluidos: Array<EstadJugador> = [];
  listaEliminados: Array<EstadJugador> = [];
  portero: Array<EstadJugador> = [];

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
  marcaTiempo: Crono;

  // Ticks para los cronos
  tick$: Observable<Tick>;

  constructor(private router: Router,
    private crono: CronoService,
    private pasoDatos: PasoDatosService,
    private toastController: ToastController,
    private eventosService: EventosService) {}

  ngOnInit() {
    // divido la lista inicial en portero y jugadores de campo
    const indicePortero = this.jugCampo?.indexOf(this.jugCampo.find(po => po.datos.posicion === 'PO'));

    if (indicePortero >= 0 ){
      this.portero = this.jugCampo.splice(indicePortero, 1);
      this.portero[0].exclusion = false;
    }

    this.jugCampo = this.jugCampo?.sort((x,y) => x.datos.numero.localeCompare(y.datos.numero));
    for (let i = 0; i < this.jugCampo?.length; i++){
     this.jugCampo[i].exclusion = false;
    }

    this.listaBanquillo = this.listaBanquillo?.sort((x,y) => x.datos.numero.localeCompare(y.datos.numero));

    localStorage.setItem('accion', '');
    localStorage.setItem('jugadorId', '');

    // Observable ticks
    this.tick$ = this.crono.tickObservable;


    this.tick$.subscribe(res => {
      if (res.segundos !== 0){
        this.portero.forEach(jug => jug.segJugados++);
        this.jugCampo.forEach(jug => jug.segJugados++);
        this.listaExcluidos.forEach(jug => {
          //console.log(this.listaExcluidos);
          jug.segJugados++;
          jug.segExclusion--;
        });
      }
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngDoCheck(){
    // Si alguno de los crono de 2 minutos ha llegado a cero,
    // Actualizo los cronos de 2 minutos de exclusión
    if (this.listaExcluidos !== undefined){
      for (let i = 0; i < this.listaExcluidos?.length; i++){

        if (this.listaExcluidos[i].segExclusion === 0) {
          this.listaExcluidos[i].exclusion = false;

          // devolvemos al jugador a la lista de banquillo, o si es la tercera exclusión, roja o azul a la de eliminados
          const titular = this.listaExcluidos.splice(i,1);
          if (titular[0].exclusiones === 3 || titular[0].rojas === 1 || titular[0].azules === 1) {
            this.listaEliminados.push(titular[0]);
          } else {
            this.listaBanquillo.push(titular[0]);
          }
        }
      }
    }

    if (localStorage.getItem('accion') !== ''){
      this.sumaEstad(localStorage.getItem('accion'), localStorage.getItem('jugadorId'));
      localStorage.setItem('accion', '');
      localStorage.setItem('jugadorId', '');

    }
  }

  btnGol(jugador: EstadJugador): void{
    const detalle = {accion: Acciones.gol, jugador, marcaTiempo: this.crono.marcaTiempo()};
    this.pasoDatos.setPantalla( 'detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnGolRival(jugador: EstadJugador): void{
    const detalle = {accion: Acciones.golRival, jugador, marcaTiempo: this.crono.marcaTiempo()};
    this.pasoDatos.setPantalla( 'detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnLanzamiento(jugador: EstadJugador): void{
    const detalle = {accion: Acciones.lanzamiento, jugador, marcaTiempo: this.crono.marcaTiempo()};
    this.pasoDatos.setPantalla( 'detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnParada(jugador: EstadJugador): void {
    const detalle = {accion: Acciones.parada, jugador, marcaTiempo: this.crono.marcaTiempo()};
    this.pasoDatos.setPantalla('detalle-jugador', detalle);
    this.router.navigate(['/detalle-jugador']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnAmarilla(jugador: EstadJugador): void{
    // Sumamos a la estadística
    localStorage.setItem('jugadorId', jugador.datos.id);
    localStorage.setItem('accion', Acciones.tarjetaAmarilla);

    // Se crea el evento para la base de datos
    const eventoJugador = this.eventosService.newEvento();
    eventoJugador.accionPrincipal = Acciones.tarjetaAmarilla;
    eventoJugador.creadorEvento = jugador.datos.nombre;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = localStorage.getItem('partidoId');
    eventoJugador.equipoId = localStorage.getItem('equipoId');
    this.pasoDatos.onEventoJugador( eventoJugador );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnRoja(jugador: EstadJugador): void{
    this.dosMinutos(jugador);

    // Sumamos a la estadística
    localStorage.setItem('jugadorId', jugador.datos.id);
    localStorage.setItem('accion', Acciones.tarjetaRoja);

    // Se crea el evento para la base de datos
    const eventoJugador = this.eventosService.newEvento();
    eventoJugador.accionPrincipal = Acciones.tarjetaRoja;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = localStorage.getItem('partidoId');
    eventoJugador.equipoId = localStorage.getItem('equipoId');
    eventoJugador.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoJugador );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnAzul(jugador: EstadJugador): void{
    this.dosMinutos(jugador);

    // Sumamos a la estadística
    localStorage.setItem('jugadorId', jugador.datos.id);
    localStorage.setItem('accion', Acciones.tarjetaAzul);

    // Se crea el evento para la base de datos
    const eventoJugador = this.eventosService.newEvento();
    eventoJugador.accionPrincipal = Acciones.tarjetaAzul;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = localStorage.getItem('partidoId');
    eventoJugador.equipoId = localStorage.getItem('equipoId');
    eventoJugador.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoJugador );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnDosMinutos(jugador: EstadJugador){
    this.dosMinutos(jugador);

    // Sumamos a la estadística
    //this.sumaEstad(Acciones.dos_minutos, jugador.datos.id);
    localStorage.setItem('jugadorId', jugador.datos.id);
    localStorage.setItem('accion', Acciones.dosMinutos);

    // Se crea el evento para la base de datos
    const eventoJugador = this.eventosService.newEvento();
    eventoJugador.accionPrincipal = Acciones.dosMinutos;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = localStorage.getItem('partidoId');
    eventoJugador.equipoId = localStorage.getItem('equipoId');
    eventoJugador.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoJugador );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  dosMinutos(jugador: EstadJugador){
    let excluido: Array<EstadJugador> = [];
    let salir = false;

    // Si está ya en la lista de excluidos, sumamos 120 segundos
    this.listaExcluidos.forEach(jugExc => {
      if (jugExc.datos.id === jugador.datos.id){
        jugExc.segExclusion += 120;
        //this.crono.sumaCrono2min(jugador.datos.id, 120);
        salir = true;
      }
    });

    // Si no está en la lista, lo añadimos
    if (!salir){
      if (this.portero[0]?.datos.id === jugador.datos.id){
        this.portero[0].exclusion = true;
        this.portero[0].segExclusion = 120;

        // Mandamos al portero a la lista de excluidos
        excluido = this.portero.splice(0,1);
        this.listaExcluidos.push(excluido[0]);
        //this.crono.setCrono2min(jugador.datos.id, excluido[0].segExclusion);
      } else {
        // Jugadores de campo
        for (let i = 0; i < this.jugCampo?.length; i++){
          if (this.jugCampo[i].datos.id === jugador.datos.id){
            this.jugCampo[i].exclusion = true;
            this.jugCampo[i].segExclusion = 120;

            // Mandamos al jugador a la lista de excluidos
            excluido = this.jugCampo.splice(i,1);
            this.listaExcluidos.push(excluido[0]);
            //this.crono.setCrono2min(jugador.datos.id, excluido[0].segExclusion);
            break;
          }
         }
        }
      }
  }

  btnCambioMarca(){
    // Se establece una marca de tiempo cuando el usuario presiona el botón de cambio.
    this.marcaTiempo = this.crono.marcaTiempo();
  }

  btnCambio(titular: EstadJugador, cambio: EstadJugador, esPortero: boolean){
    let jugSale: EstadJugador[];

    if (esPortero){
      jugSale = this.portero.splice(0,1);

    } else {
      const sale = this.jugCampo.findIndex(res => res.datos.id === titular.datos.id);
      jugSale = this.jugCampo.splice(sale, 1);
    }
    // Cambio en las listas

    const entra = this.listaBanquillo.findIndex(res => res.datos.id === cambio.datos.id);
    const jugEntra = this.listaBanquillo.splice(entra, 1);

    if (esPortero){
      this.portero.push(jugEntra[0]);
    } else {
      this.jugCampo.push(jugEntra[0]);
    }

    this.listaBanquillo.push(jugSale[0]);

    // Se crean los eventos para la base de datos
    // Jugador que sale del campo
    const eventoSale = this.eventosService.newEvento();
    eventoSale.crono = this.marcaTiempo;
    eventoSale.accionPrincipal = Acciones.cambio;
    eventoSale.accionSecundaria = Acciones.sale;
    eventoSale.jugadorId = jugSale[0].datos.id;
    eventoSale.partidoId = localStorage.getItem('partidoId');
    eventoSale.equipoId = localStorage.getItem('equipoId');
    eventoSale.creadorEvento = jugSale[0].datos.nombre;
    this.pasoDatos.onEventoJugador( eventoSale );
    // Jugador que entra al campo
    const eventoEntra = this.eventosService.newEvento();
    eventoEntra.crono = this.marcaTiempo;
    eventoEntra.accionPrincipal = Acciones.cambio;
    eventoEntra.accionSecundaria = Acciones.entra;
    eventoEntra.jugadorId = jugEntra[0].datos.id;
    eventoEntra.partidoId = localStorage.getItem('partidoId');
    eventoEntra.equipoId = localStorage.getItem('equipoId');

    eventoEntra.creadorEvento = jugEntra[0].datos.nombre;
    this.pasoDatos.onEventoJugador( eventoEntra );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnEntra(jugador: EstadJugador){
    // Entra al campo
    if (jugador.datos.portero && this.portero.length === 0){
      this.portero.push(jugador);
    } else {
      this.jugCampo.push(jugador);
    }

    // Sale de la lista de banquillo
    const entra = this.listaBanquillo.findIndex(res => res.datos.id === jugador.datos.id);
    this.listaBanquillo.splice(entra, 1);

    // Jugador que entra al campo
    const eventoEntra = this.eventosService.newEvento();
    eventoEntra.accionPrincipal = Acciones.cambio;
    eventoEntra.accionSecundaria = Acciones.entra;
    eventoEntra.jugadorId = jugador.datos.id;
    eventoEntra.partidoId = localStorage.getItem('partidoId');
    eventoEntra.equipoId = localStorage.getItem('equipoId');
    eventoEntra.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoEntra );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnSale(jugador: EstadJugador, esPortero: boolean){
    // Sale del campo al banquillo
    this.listaBanquillo.push(jugador);

    // Sale de la lista de portero o de jugCampo
    if (esPortero){
      this.portero.splice(0,1);

    } else {
      const sale = this.jugCampo.findIndex(res => res.datos.id === jugador.datos.id);
      this.jugCampo.splice(sale, 1);
    }

    // Jugador que sale del campo
    const eventoSale = this.eventosService.newEvento();
    eventoSale.accionPrincipal = Acciones.cambio;
    eventoSale.accionSecundaria = Acciones.sale;
    eventoSale.jugadorId = jugador.datos.id;
    eventoSale.partidoId = localStorage.getItem('partidoId');
    eventoSale.equipoId = localStorage.getItem('equipoId');
    eventoSale.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoSale );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

   sumaEstad(accion: any, jugadorId: any){
    if (accion === 'accion.gol' || accion === 'accion.lanzamiento'){
      const indice = this.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
      if (accion === Acciones.gol){
        this.jugCampo[indice].goles++;
      } else {
        this.jugCampo[indice].lanzFallados++;
      }
    } else if (accion === 'accion.parada' || accion === 'accion.gol_rival'){
      if (accion === Acciones.parada){
        this.portero[0].paradas++;
      } else {
        this.portero[0].golesRival++;
      }
    } else if (accion === Acciones.robo){
      if (this.portero[0].datos.id === jugadorId){
        // Es un robo del portero
        this.portero[0].robos++;
      } else {
        // Es un robo de un jugador de campo
        const indice = this.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
        this.jugCampo[indice].robos++;
      }
    } else if (accion === Acciones.perdida){
      if (this.portero[0].datos.id === jugadorId){
        // Es una pérdida del portero
        this.portero[0].perdidas++;
      } else {
        // Es una pérdida de un jugador de campo
        const indice = this.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
        this.jugCampo[indice].perdidas++;
      }
    } else if (accion === Acciones.dosMinutos){
      // 2 minutos de cualquier jugador
      const indice = this.listaExcluidos.findIndex(jugPos => jugPos.datos.id === jugadorId);
      this.listaExcluidos[indice].exclusiones++;
    } else if (accion === Acciones.tarjetaAmarilla){
      if (this.portero[0].datos.id === jugadorId){
        // Amarilla del portero
        this.portero[0].amarillas++;
      } else {
        // Amarilla de un jugador de campo
        const indice = this.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
        this.jugCampo[indice].amarillas++;
      }
    } else if (accion === Acciones.tarjetaRoja){
      // Roja de cualquier jugador
      const indice = this.listaExcluidos.findIndex(jugPos => jugPos.datos.id === jugadorId);
      this.listaExcluidos[indice].rojas++;
    } else if (accion === Acciones.tarjetaAzul){
      // Azul de cualquier jugador
      const indice = this.listaExcluidos.findIndex(jugPos => jugPos.datos.id === jugadorId);
      this.listaExcluidos[indice].azules++;
    }
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
