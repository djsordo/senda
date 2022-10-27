import { PartidosService } from 'src/app/services/partidos.service';
import { AlertController } from '@ionic/angular';
import { BDGeneralService } from './../services/bdgeneral.service';
import { Subscription } from 'rxjs';
import { EstadJugadorService } from './../services/estad-jugador.service';
import { UsuarioService } from './../services/usuario.service';
import { EventosService } from 'src/app/services/eventos.service';
import { PasoDatosService } from './../services/paso-datos.service';
import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { TradService } from '../services/trad.service';
import { ToastController, Platform } from '@ionic/angular';

import { Evento } from '../modelo/evento';
import { MarcadorService } from '../components/marcador/marcador.service';
import { Acciones } from '../services/eventos.service';
import { EstadJugador } from '../modelo/estadJugador';
import { EstadPartidoService } from '../services/estad-partido.service';
import { Usuario } from '../modelo/usuario';

@Component({
  selector: 'app-modo-jugador',
  templateUrl: './modo-jugador.page.html',
  styleUrls: ['./modo-jugador.page.scss'],
})
export class ModoJugadorPage implements OnInit, DoCheck, OnDestroy {
  usuario: Usuario;
  listaInicial: Array<EstadJugador> = [];
  listaBanquillo: Array<EstadJugador> = [];
  listaExcluidos: Array<EstadJugador> = [];
  listaEliminados: Array<EstadJugador> = [];

  portero: EstadJugador;
  estadoPartido: string;

  miSuscripcionAEventoJugador: any = null;

  nombres= {
    casa: 'B. M. LAGUNA',
    fuera: 'SAN AGUSTÍN'
  };

  marcador= {
    nuestro: 0,
    rival: 0,
  };

  subs: Subscription[] = [];
  respuesta = 'no';

  constructor(private router: Router,
              private toastController: ToastController,
              private pasoDatos: PasoDatosService,
              private marcadorService: MarcadorService,
              private tradService: TradService,
              private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService,
              private platform: Platform,
              private usuarioService: UsuarioService,
              private partidoService: PartidosService,
              private estadJugadorService: EstadJugadorService,
              private bdGeneralService: BDGeneralService,
              private alertController: AlertController) {
    }

  ngOnInit() {
    const listaInicialPrevia = this.pasoDatos.getListaInicial();
    const listaBanquilloPrevia = this.pasoDatos.getListaBanquillo();
    /* const estadoPartido = this.usuarioService.getEstadoPartido(localStorage.getItem('partidoId')); */
    /* this.estadoPartido = this.partidoService.getEstado(localStorage.getItem('partidoId')); */
    this.estadoPartido = localStorage.getItem('estadoPartido');

    console.log('estado: ', this.estadoPartido);
    this.nombres = this.pasoDatos.getNombresEquipos();
    this.usuario = this.usuarioService.getUsuario();

    console.log('Usuario: ', this.usuario);

    // Para manejar el botón de atrás
    this.subs.push(this.platform.backButton.subscribeWithPriority(10, () => {
      this.navAtras();
    }));

    this.listaEliminados = [];
    this.listaExcluidos = [];

    listaInicialPrevia.forEach(jugadorPrevia => {
      const jugador = {} as EstadJugador;
      jugador.datos = jugadorPrevia;
      jugador.partidoId = localStorage.getItem('partidoId');
      jugador.amarillas = 0;
      jugador.azules = 0;
      jugador.exclusiones = 0;
      jugador.goles = 0;
      jugador.lanzFallados = 0;
      jugador.perdidas = 0;
      jugador.robos = 0;
      jugador.rojas = 0;
      jugador.segExclusion = 0;
      jugador.exclusion = false;
      jugador.exclusiones = 0;
      jugador.paradas = 0;
      jugador.golesRival = 0;
      jugador.segJugados = 0;
      this.listaInicial.push(jugador);
    });
    console.log('listaInicial: ', this.listaInicial);
    listaBanquilloPrevia.forEach(jugadorPrevia => {
      const jugador = {} as EstadJugador;
      jugador.datos = jugadorPrevia;
      jugador.partidoId = localStorage.getItem('partidoId');
      jugador.amarillas = 0;
      jugador.azules = 0;
      jugador.exclusiones = 0;
      jugador.goles = 0;
      jugador.lanzFallados = 0;
      jugador.perdidas = 0;
      jugador.robos = 0;
      jugador.rojas = 0;
      jugador.segExclusion = 0;
      jugador.exclusion = false;
      jugador.exclusiones = 0;
      jugador.paradas = 0;
      jugador.golesRival = 0;
      jugador.segJugados = 0;
      this.listaBanquillo.push(jugador);
    });

    this.estadPartidoService.actualiza('nombreEquipo', this.nombres.casa);
    this.estadPartidoService.actualiza('nombreRival', this.nombres.fuera);
    this.estadPartidoService.actualiza('partidoId', localStorage.getItem('partidoId'));

    // Guardo las estadísticas del partido en la base de datos
    this.estadPartidoService.addEstadPartido().then(estad => {
      this.estadPartidoService.estadPartido.id = estad.id;
      this.estadPartidoService.actualiza('id', estad.id);
      this.estadPartidoService.updateEstadPartido();

    });

    this.miSuscripcionAEventoJugador =
    this.pasoDatos.suscribirmeAEventoJugador( (evento: Evento) => {
      this.toastOk( this.construyeMensajeEvento(evento) );

      if( evento.accionPrincipal === Acciones.gol ){
        this.marcadorService.gol();
      }
      if( evento.accionPrincipal === Acciones.golRival ){
        this.marcadorService.golRival();
      }

      // Aquí llamo a la función que inserta el evento en la base de datos.
      this.eventosService.addEventoBD(evento).then(even => {evento.id = even.id;});
    } );
  }

  ngDoCheck(){
    /* this.estadoPartido = this.usuarioService.getEstadoPartido(localStorage.getItem('partidoId')); */
    this.estadoPartido = localStorage.getItem('estadoPartido');
  }

  cambioPortero(portero: EstadJugador){
    this.portero = portero;
  }

  cambiarModo(){
    this.router.navigate(['/modo-accion']);
  }

  async toastOk(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

  ngOnDestroy(){
    console.log('Compònente modo-jugador destruido');
    this.miSuscripcionAEventoJugador.unsubscribe();
    this.subs.forEach(sub => sub.unsubscribe());
  }

  navAtras(){
    // Esta función se encarga de navegar hacia atrás según convenga
    /* const estadoPartido = this.usuarioService.getEstadoPartido(localStorage.getItem('partidoId')); */
    /* this.estadoPartido = this.partidoService.getEstado(localStorage.getItem('partidoId')); */
    this.estadoPartido = localStorage.getItem('estadoPartido');
    if (this.estadoPartido === 'en curso'){
      // Hay que avisar de que si se sale se borrarán todas las estadísticas.
      this.mostrarAlerta().then( resp => {
        console.log(resp);
        if (resp === 'confirm'){
          this.subs = this.bdGeneralService.resetPartido(localStorage.getItem('partidoId'));
          this.router.navigate(['/home']);
        };
      });

    } else if (this.estadoPartido === 'en preparacion'){
      // Hacemos reset de estadísticas
      this.subs = this.bdGeneralService.resetPartido(localStorage.getItem('partidoId'));
      this.router.navigate(['/inicio-sel-jugadores']);
    }
  }
  async mostrarAlerta(){
    let respuesta: string;
    const alert = await this.alertController.create({
      header: '¡¡¡ Atención !!! ',
      subHeader: 'Si sales de esta pantalla se perderán todas las estadísticas recabadas hasta ahora. ¿Realmente desea salir?',
      buttons: [{
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Sí',
        role: 'confirm',
      },
    ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    return role;
  }

  finalPartido(){
    // Grabamos estadísticas de cada jugador
    console.log('Portero: ', this.portero);
    if (this.portero){
      this.estadJugadorService.addEstadJugador(this.portero).then(estad => {
        this.portero.id = estad.id;
        this.estadJugadorService.updateEstadJugador(this.portero);
      });
    }

    this.listaInicial.forEach(jug => {
      console.log('Pista: ', jug);
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaBanquillo.forEach(jug => {
      console.log('Banquillo: ', jug);
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaExcluidos.forEach(jug => {
      console.log('Excluidos: ', jug);
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaEliminados.forEach(jug => {
      console.log('Eliminados: ', jug);
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    // Navegar a la pantalla principal.
    this.router.navigate(['/home']);
  }

  private construyeMensajeEvento( evento: Evento ){
    if( !evento.posicionCampo && !evento.posicionPorteria ){
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}`;
    }else if( evento.posicionCampo && !evento.posicionPorteria ){
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}\
          desde ${this.tradService.t(evento.posicionCampo)}`;
    }else if( !evento.posicionCampo && evento.posicionPorteria ){
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}\
      hacia ${this.tradService.t(evento.posicionPorteria)}`;
    }else{
      return `${this.tradService.t(evento.accionPrincipal)} de ${evento.creadorEvento}\
      desde ${this.tradService.t(evento.posicionCampo)} hacia ${this.tradService.t(evento.posicionPorteria)}`;
    }
  }

}
