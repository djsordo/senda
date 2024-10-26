import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { IonAccordionGroup, ToastController } from '@ionic/angular';

import { EstadPartidoService } from './../../services/estad-partido.service';
import { EstadJugadorService } from '../../services/estad-jugador.service';
import { EstadJugador } from './../../modelo/estadJugador';
import { PasoDatosService } from './../../services/paso-datos.service';
import { CronoService, Tick } from '../crono/crono.service';
import { Acciones, EventosService } from 'projects/mobile/src/app/services/eventos.service';
import { CronoData } from '../../modelo/cronoData';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})
export class TitularesComponent implements OnInit, OnDestroy, DoCheck {
  @Input() partidoId: string;
  @Input() equipoId: string;
  @Output() porteroEmisor = new EventEmitter<EstadJugador>();

  @ViewChild('acordeonJugadores') acordeonJugadores: IonAccordionGroup;

  listaRobos= [{nombre: 'Provocado'},
               {nombre: 'Falta en ataque'},
               {nombre: 'Intercepción'},
               {nombre: 'De las manos'},
               {nombre: 'Otros'}];
  listaPerdidas= [{nombre: 'Pase'},
                  {nombre: 'Falta en ataque'},
                  {nombre: 'Invasión'},
                  {nombre: 'Pasos'},
                  {nombre: 'Dobles'},
                  {nombre: 'De las manos'},
                  {nombre: 'Pie'},
                  {nombre: 'Otros'}];

  ev: Event;
  marcaTiempo: CronoData;

  // Ticks para los cronos
  tick$: Observable<Tick>;
  subTick: Subscription;

  segmentoMostrado = 'enPista';

  constructor(private router: Router,
    private crono: CronoService,
    private pasoDatos: PasoDatosService,
    private toastController: ToastController,
    private eventosService: EventosService,
    private estadPartidoService: EstadPartidoService,
    private estadJugadorService: EstadJugadorService) {}

  ngOnInit() {

    localStorage.setItem('accion', '');
    localStorage.setItem('jugadorId', '');

    // Observable ticks
    this.tick$ = this.crono.tickObservable;

    this.subTick = this.tick$.subscribe(res => {
      if (res.segundos !== 0){
        if( this.pasoDatos.portero )
          this.pasoDatos.portero.segJugados++;
        this.pasoDatos.jugCampo.forEach(jug => jug.segJugados++);
        this.pasoDatos.listaExcluidos.forEach(jug => {
          jug.segJugados++;
          jug.segExclusion--;
        });
      }
    });
  }

  ngDoCheck(){
    // Si alguno de los crono de 2 minutos ha llegado a cero,
    // Actualizo los cronos de 2 minutos de exclusión
    if (this.pasoDatos.listaExcluidos !== undefined){
      for (let i = 0; i < this.pasoDatos.listaExcluidos.length; i++){

        if (this.pasoDatos.listaExcluidos[i].segExclusion <= 0) {
          this.pasoDatos.listaExcluidos[i].exclusion = false;

          // devolvemos al jugador a la lista de banquillo, o si es la tercera exclusión, roja o azul a la de eliminados
          const titular = this.pasoDatos.listaExcluidos.splice(i,1);
          if (titular[0].exclusiones === 3 || titular[0].rojas === 1 || titular[0].azules === 1) {
            this.pasoDatos.listaEliminados.push(titular[0]);
          } else {
            this.pasoDatos.listaBanquillo.push(titular[0]);
          }
        }
      }
    }

    // Emitimos el portero
    if (this.pasoDatos.portero){
      this.porteroEmisor.emit(this.pasoDatos.portero);
    }

    if (localStorage.getItem('accion') !== ''){
      const jugId = localStorage.getItem('jugadorId');
      if (jugId){
        this.sumaEstad(localStorage.getItem('accion') as Acciones, jugId);
      }

      localStorage.setItem('accion', '');
      localStorage.setItem('jugadorId', '');

    }
  }

  ngOnDestroy(): void {
    this.subTick && this.subTick.unsubscribe();
  }

  btnGol(jugador: EstadJugador): void{
    const detalle = { accion: Acciones.gol,
                      accionS: this.pasoDatos.portero ? Acciones.sinPortero : '',
                      jugador,
                      marcaTiempo: this.crono.marcaTiempo()};
    this.pasoDatos.setPantalla( 'gol', detalle);
    this.router.navigate(['/gol']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;

  }

  btnGolRival(jugador: EstadJugador): void{
    const detalle = {accion: Acciones.golRival, jugador, marcaTiempo: this.crono.marcaTiempo()};
    this.pasoDatos.setPantalla( 'gol', detalle);
    this.router.navigate(['/gol']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnLanzamiento(jugador: EstadJugador): void{
    const detalle = { accion: Acciones.lanzamiento,
      accionS: this.pasoDatos.portero ? Acciones.sinPortero : '',
      jugador,
      marcaTiempo: this.crono.marcaTiempo()};

    this.pasoDatos.setPantalla( 'gol', detalle);
    this.router.navigate(['/gol']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnParada(jugador: EstadJugador): void {
    const detalle = {accion: Acciones.parada, jugador, marcaTiempo: this.crono.marcaTiempo()};
    this.pasoDatos.setPantalla('gol', detalle);
    this.router.navigate(['/gol']);

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnAmarilla(jugador: EstadJugador): void{
    // Sumamos a la estadística
    localStorage.setItem('jugadorId', jugador.datos.id);
    localStorage.setItem('accion', Acciones.tarjetaAmarilla);

    // Se crea el evento para la base de datos
    const eventoJugador = this.eventosService.newEvento();
    this.estadPartidoService.suma('amarillas', eventoJugador.crono);

    eventoJugador.accionPrincipal = Acciones.tarjetaAmarilla;
    eventoJugador.creadorEvento = jugador.datos.nombre;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = this.partidoId;
    eventoJugador.equipoId = this.equipoId;
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
    this.estadPartidoService.suma('rojas', eventoJugador.crono);

    eventoJugador.accionPrincipal = Acciones.tarjetaRoja;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = this.partidoId;
    eventoJugador.equipoId = this.equipoId;
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
    this.estadPartidoService.suma('azules', eventoJugador.crono);

    eventoJugador.accionPrincipal = Acciones.tarjetaAzul;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = this.partidoId;
    eventoJugador.equipoId = this.equipoId;
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
    this.estadPartidoService.suma('dosMinutos', eventoJugador.crono);

    eventoJugador.accionPrincipal = Acciones.dosMinutos;
    eventoJugador.jugadorId = jugador.datos.id;
    eventoJugador.partidoId = this.partidoId;
    eventoJugador.equipoId = this.equipoId;
    eventoJugador.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoJugador );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  dosMinutos(jugador: EstadJugador){
    let excluido: Array<EstadJugador> = [];
    let salir = false;

    // Si está ya en la lista de excluidos, sumamos 120 segundos
    this.pasoDatos.listaExcluidos.forEach(jugExc => {
      if (jugExc.datos.id === jugador.datos.id){
        jugExc.segExclusion += 120;
        salir = true;
      }
    });

    // Si no está en la lista, lo añadimos
    if (!salir){
      if (this.pasoDatos.portero?.datos.id === jugador.datos.id){
        this.pasoDatos.portero.exclusion = true;
        this.pasoDatos.portero.segExclusion = 120;

        // Mandamos al portero a la lista de excluidos
        this.pasoDatos.listaExcluidos.push(this.pasoDatos.portero);
        this.pasoDatos.portero = null;
      } else {
        // Jugadores de campo
        for (let i = 0; i < this.pasoDatos.jugCampo?.length; i++){
          if (this.pasoDatos.jugCampo[i].datos.id === jugador.datos.id){
            this.pasoDatos.jugCampo[i].exclusion = true;
            this.pasoDatos.jugCampo[i].segExclusion = 120;

            // Mandamos al jugador a la lista de excluidos
            excluido = this.pasoDatos.jugCampo.splice(i,1);
            this.pasoDatos.listaExcluidos.push(excluido[0]);
            break;
          }
         }
        }
      }

    // Emitimos el portero
    this.porteroEmisor.emit(this.pasoDatos.portero);
  }

  btnCambioMarca(){
    // Se establece una marca de tiempo cuando el usuario presiona el botón de cambio.
    this.marcaTiempo = this.crono.marcaTiempo();
  }

  btnCambio(titular: EstadJugador, cambio: EstadJugador, esPortero: boolean){
    let jugSale: EstadJugador[];

    if (esPortero){
      jugSale = [this.pasoDatos.portero];
      this.pasoDatos.portero = null;

    } else {
      const sale = this.pasoDatos.jugCampo.findIndex(res => res.datos.id === titular.datos.id);
      jugSale = this.pasoDatos.jugCampo.splice(sale, 1);
    }
    // Cambio en las listas

    const entra = this.pasoDatos.listaBanquillo.findIndex(res => res.datos.id === cambio.datos.id);
    const jugEntra = this.pasoDatos.listaBanquillo.splice(entra, 1);

    if (esPortero){
      this.pasoDatos.portero = jugEntra[0];
    } else {
      this.pasoDatos.jugCampo.push(jugEntra[0]);
    }

    this.pasoDatos.listaBanquillo.push(jugSale[0]);

    // Emitimos el portero
    this.porteroEmisor.emit(this.pasoDatos.portero);

    // Se crean los eventos para la base de datos
    // Jugador que sale del campo
    const eventoSale = this.eventosService.newEvento();
    eventoSale.crono = this.marcaTiempo;
    eventoSale.accionPrincipal = Acciones.cambio;
    eventoSale.accionSecundaria = Acciones.sale;
    eventoSale.jugadorId = jugSale[0].datos.id;
    eventoSale.partidoId = this.partidoId;
    eventoSale.equipoId = this.equipoId;
    eventoSale.creadorEvento = jugSale[0].datos.nombre;
    this.pasoDatos.onEventoJugador( eventoSale );
    // Jugador que entra al campo
    const eventoEntra = this.eventosService.newEvento();
    eventoEntra.crono = this.marcaTiempo;
    eventoEntra.accionPrincipal = Acciones.cambio;
    eventoEntra.accionSecundaria = Acciones.entra;
    eventoEntra.jugadorId = jugEntra[0].datos.id;
    eventoEntra.partidoId = this.partidoId;
    eventoEntra.equipoId = this.equipoId;

    eventoEntra.creadorEvento = jugEntra[0].datos.nombre;
    this.pasoDatos.onEventoJugador( eventoEntra );

    // Cerramos el acordeón de jugadores
    this.acordeonJugadores.value = undefined;
  }

  btnEntra(jugador: EstadJugador){
    // Entra al campo
    if (jugador.datos.portero && !this.pasoDatos.portero){
      this.pasoDatos.portero = jugador;
    } else {
      this.pasoDatos.jugCampo.push(jugador);
    }

    // Sale de la lista de banquillo
    const entra = this.pasoDatos.listaBanquillo.findIndex(res => res.datos.id === jugador.datos.id);
    this.pasoDatos.listaBanquillo.splice(entra, 1);

    // Emitimos el portero
    this.porteroEmisor.emit(this.pasoDatos.portero);

    // Jugador que entra al campo
    const eventoEntra = this.eventosService.newEvento();
    eventoEntra.accionPrincipal = Acciones.cambio;
    eventoEntra.accionSecundaria = Acciones.entra;
    eventoEntra.jugadorId = jugador.datos.id;
    eventoEntra.partidoId = this.partidoId;
    eventoEntra.equipoId = this.equipoId;
    eventoEntra.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoEntra );

    // Cerramos el acordeón de jugadores
    //this.acordeonJugadores.value = undefined;
  }

  btnSale(jugador: EstadJugador, esPortero: boolean){
    // Sale del campo al banquillo
    this.pasoDatos.listaBanquillo.push(jugador);

    // Sale de la lista de portero o de jugCampo
    if (esPortero){
      this.pasoDatos.portero = null;

    } else {
      const sale = this.pasoDatos.jugCampo.findIndex(res => res.datos.id === jugador.datos.id);
      this.pasoDatos.jugCampo.splice(sale, 1);
    }

    // Emitimos el portero
    this.porteroEmisor.emit(this.pasoDatos.portero);

    // Jugador que sale del campo
    const eventoSale = this.eventosService.newEvento();
    eventoSale.accionPrincipal = Acciones.cambio;
    eventoSale.accionSecundaria = Acciones.sale;
    eventoSale.jugadorId = jugador.datos.id;
    eventoSale.partidoId = this.partidoId;
    eventoSale.equipoId = this.equipoId;
    eventoSale.creadorEvento = jugador.datos.nombre;
    this.pasoDatos.onEventoJugador( eventoSale );

    // Cerramos el acordeón de jugadores
    //this.acordeonJugadores.value = undefined;
  }

  sumaEstad(accion: Acciones, jugadorId: string){
    let jugActivo: EstadJugador; // Esadísticas del jugador para ser grabadas en BD

    if (accion === 'accion.gol' || accion === 'accion.lanzamiento'){
      const indice = this.pasoDatos.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
      if (accion === Acciones.gol){
        this.pasoDatos.jugCampo[indice].goles++;
        jugActivo = this.pasoDatos.jugCampo[indice];
      } else {
        this.pasoDatos.jugCampo[indice].lanzFallados++;
        jugActivo = this.pasoDatos.jugCampo[indice];
      }
    } else if (accion === Acciones.parada){
      // Parada del portero
      this.pasoDatos.portero.paradas++;
      jugActivo = this.pasoDatos.portero;
    } else if (accion === Acciones.golRival && this.pasoDatos.portero){
      // Gol del rival. Sólo contará si existe un portero.
        this.pasoDatos.portero.golesRival++;
        jugActivo = this.pasoDatos.portero;
    } else if (accion === Acciones.robo){
      if (this.pasoDatos.portero?.datos.id === jugadorId){
        // Es un robo del portero
        this.pasoDatos.portero.robos++;
        jugActivo = this.pasoDatos.portero;
      } else {
        // Es un robo de un jugador de campo
        const indice = this.pasoDatos.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
        this.pasoDatos.jugCampo[indice].robos++;
        jugActivo = this.pasoDatos.jugCampo[indice];
      }
    } else if (accion === Acciones.perdida){
      if (this.pasoDatos.portero?.datos.id === jugadorId){
        // Es una pérdida del portero
        this.pasoDatos.portero.perdidas++;
        jugActivo = this.pasoDatos.portero;
      } else {
        // Es una pérdida de un jugador de campo
        const indice = this.pasoDatos.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
        this.pasoDatos.jugCampo[indice].perdidas++;
        jugActivo = this.pasoDatos.jugCampo[indice];
      }
    } else if (accion === Acciones.dosMinutos){
      // 2 minutos de cualquier jugador
      const indice = this.pasoDatos.listaExcluidos.findIndex(jugPos => jugPos.datos.id === jugadorId);
      this.pasoDatos.listaExcluidos[indice].exclusiones++;
      jugActivo = this.pasoDatos.listaExcluidos[indice];
    } else if (accion === Acciones.tarjetaAmarilla){
      if (this.pasoDatos.portero.datos.id === jugadorId){
        // Amarilla del portero
        this.pasoDatos.portero.amarillas++;
        jugActivo = this.pasoDatos.portero;
      } else {
        // Amarilla de un jugador de campo
        const indice = this.pasoDatos.jugCampo.findIndex(jugPos => jugPos.datos.id === jugadorId);
        this.pasoDatos.jugCampo[indice].amarillas++;
        jugActivo = this.pasoDatos.jugCampo[indice];
      }
    } else if (accion === Acciones.tarjetaRoja){
      // Roja de cualquier jugador
      const indice = this.pasoDatos.listaExcluidos.findIndex(jugPos => jugPos.datos.id === jugadorId);
      this.pasoDatos.listaExcluidos[indice].rojas++;
      jugActivo = this.pasoDatos.listaExcluidos[indice];
    } else if (accion === Acciones.tarjetaAzul){
      // Azul de cualquier jugador
      const indice = this.pasoDatos.listaExcluidos.findIndex(jugPos => jugPos.datos.id === jugadorId);
      this.pasoDatos.listaExcluidos[indice].azules++;
      jugActivo = this.pasoDatos.listaExcluidos[indice];
    }

    // Aquí grabamos la estadística del jugador
    this.estadJugadorService.updateEstadJugador(jugActivo);
   }

  async toastOk(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  segmentChanged(ev: any){
    this.segmentoMostrado = ev.detail.value;
    console.log(this.segmentoMostrado);
  }

  getPortero() {
    return this.pasoDatos.portero;
  }

  getListaBanquillo(){
    return this.pasoDatos.listaBanquillo;
  }

  getJugCampo(){
    return this.pasoDatos.jugCampo;
  }

  getExcluidos(){
    return this.pasoDatos.listaExcluidos;
  }

  getEliminados(){
    return this.pasoDatos.listaEliminados;
  }

}
