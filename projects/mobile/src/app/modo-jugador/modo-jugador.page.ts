import { AlertController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Output, DoCheck } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';


import { TradService } from '../services/trad.service';
import { EventosService } from 'projects/mobile/src/app/services/eventos.service';
import { PasoDatosService } from './../services/paso-datos.service';
import { EstadJugadorService } from './../services/estad-jugador.service';
import { BDGeneralService } from './../services/bdgeneral.service';
import { Evento } from '../modelo/evento';
import { MarcadorService } from '../components/marcador/marcador.service';
import { Acciones } from '../services/eventos.service';
import { EstadJugador, initEstadJugador } from '../modelo/estadJugador';
import { EstadPartidoService } from '../services/estad-partido.service';
import { Usuario } from '../modelo/usuario';
import { Partido } from '../modelo/partido';
import { Db } from '../services/db.service';
import { SecurityService } from '../services/security.service';
import { JugadorIntentEs } from '../components/jugador-intent/jugador-intent-es';
import { Jugador } from '../modelo/jugador';

@Component({
  selector: 'app-modo-jugador',
  templateUrl: './modo-jugador.page.html',
  styleUrls: ['./modo-jugador.page.scss'],
})
export class ModoJugadorPage implements OnInit, DoCheck, OnDestroy {
  
  partido: Partido;
  usuario: Usuario;
  
  listaInicial$: BehaviorSubject<Array<EstadJugador>>;
  private listaInicial: Array<EstadJugador> = [];
  
  listaBanquillo$: BehaviorSubject<Array<EstadJugador>>;
  private listaBanquillo: Array<EstadJugador> = [];
  
  listaExcluidos: Array<EstadJugador> = [];
  listaEliminados: Array<EstadJugador> = [];

  portero: EstadJugador;
  estadoPartido: string;

  miSuscripcionAEventoJugador: any = null;

  nombres = { casa: null, fuera: null };

  marcador= {
    nuestro: 0,
    rival: 0,
  };

  subs: Subscription[] = [];
  respuesta = 'no';

  constructor(private db: Db,
              private router: Router,
              private toastController: ToastController,
              private pasoDatos: PasoDatosService,
              private marcadorService: MarcadorService,
              private tradService: TradService,
              private eventosService: EventosService,
              private estadPartidoService: EstadPartidoService,
              private platform: Platform,
              private securityService: SecurityService,
              private estadJugadorService: EstadJugadorService,
              private bdGeneralService: BDGeneralService,
              private alertController: AlertController,
              private activatedRoute: ActivatedRoute) {
    }

  ngOnInit() {
    this.estadoPartido = localStorage.getItem('estadoPartido');
    this.listaInicial$ = new BehaviorSubject<EstadJugador[]>([]);
    this.listaBanquillo$ = new BehaviorSubject<EstadJugador[]>([]);
    this.listaEliminados = [];
    this.listaExcluidos = [];

    this.activatedRoute.params.subscribe( (paramData: Params) => {
      this.db.getPartido( paramData.partidoId )
        .then( (partido: Partido) => {
          this.partido = partido;
          this.estadoPartido = partido.config.estado;
          this.afterPartidoIsLoaded();
        });
    });

    this.nombres = this.pasoDatos.getNombresEquipos();
    this.usuario = this.securityService.getUsuario();
    console.log("el usuario leido es: ", this.usuario );

    // Para manejar el botón de atrás
    this.subs.push(this.platform.backButton.subscribeWithPriority(10, () => {
      this.navAtras();
    }));

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

    this.comienzoPartido();
  }

  private afterPartidoIsLoaded(){

    this.setListaInicial( this.pasoDatos.getListaInicial() );    
    this.setListaBanquillo(this.pasoDatos.getListaBanquillo());

    this.estadPartidoService.actualiza('nombreEquipo', this.nombres.casa);
    this.estadPartidoService.actualiza('nombreRival', this.nombres.fuera);
    this.estadPartidoService.actualiza('partidoId', this.partido.id);

    // Guardo las estadísticas del partido en la base de datos
    this.estadPartidoService.addEstadPartido().then(estad => {
      this.estadPartidoService.estadPartido.id = estad.id;
      this.estadPartidoService.actualiza('id', estad.id);
      this.estadPartidoService.updateEstadPartido();
    });
    
  }

  private setListaInicial( listaInicial: Array<Jugador> ){
    this.listaInicial = [];
    listaInicial.forEach(jugadorPrevia => {
      const estadJugador =  initEstadJugador();
      estadJugador.datos = jugadorPrevia; 
      estadJugador.partidoId = this.partido.id;
      this.listaInicial.push(estadJugador);
    });
    this.listaInicial$.next( this.listaInicial );
  }

  private setListaBanquillo( listaBanquillo: Array<Jugador> ){
    this.listaBanquillo = [];
    listaBanquillo.forEach(jugadorPrevia => {
      const estadJugador = initEstadJugador();
      estadJugador.datos = jugadorPrevia; 
      estadJugador.partidoId = this.partido.id;
      this.listaBanquillo.push(estadJugador);
    });
    this.listaBanquillo$.next( this.listaBanquillo );
  }

  ngDoCheck(){
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
    this.miSuscripcionAEventoJugador.unsubscribe();
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /**
   * Función que se encarga de navegar hacia atrás según convenga.
   */
  navAtras(){
    console.log('paso por funcion navegar atrás');
    this.estadoPartido = localStorage.getItem('estadoPartido');
    if (this.estadoPartido === 'en curso'){
      // Hay que avisar de que si se sale se borrarán todas las estadísticas.
      this.mostrarAlerta().then( resp => {
        /* console.log(resp); */
        if (resp === 'confirm'){
          this.bdGeneralService.resetPartido(this.partido.id);
          this.router.navigate(['/home']);
        };
      });

    } else if (this.estadoPartido === 'en preparacion'){
      // Hacemos reset de estadísticas
      this.bdGeneralService.resetPartido(this.partido.id);
      this.router.navigate(['/inicio-sel-jugadores']);
    }
  }

  onTest(){
    console.log("de momento nada");
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
    /* console.log('Portero: ', this.portero); */
    if (this.portero){
      this.estadJugadorService.addEstadJugador(this.portero).then(estad => {
        this.portero.id = estad.id;
        this.estadJugadorService.updateEstadJugador(this.portero);
      });
    }

    this.listaInicial.forEach(jug => {
      /* console.log('Pista: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaBanquillo.forEach(jug => {
      /* console.log('Banquillo: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaExcluidos.forEach(jug => {
      /* console.log('Excluidos: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaEliminados.forEach(jug => {
      /* console.log('Eliminados: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    // Navegar a la pantalla principal.
    this.router.navigate(['/home']);
  }

  comienzoPartido(){
    // Grabamos estadísticas de cada jugador
    /* console.log('Portero: ', this.portero); */
    if (this.portero){
      this.estadJugadorService.addEstadJugador(this.portero).then(estad => {
        this.portero.id = estad.id;
        this.estadJugadorService.updateEstadJugador(this.portero);
      });
    }

    this.listaInicial.forEach(jug => {
      /* console.log('Pista: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaBanquillo.forEach(jug => {
      /* console.log('Banquillo: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaExcluidos.forEach(jug => {
      /* console.log('Excluidos: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });

    this.listaEliminados.forEach(jug => {
      /* console.log('Eliminados: ', jug); */
      this.estadJugadorService.addEstadJugador(jug).then(estad => {
        jug.id = estad.id;
        this.estadJugadorService.updateEstadJugador(jug);
      });
    });
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
