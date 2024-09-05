import { AlertController } from '@ionic/angular';
import { PartidosService } from './../../services/partidos.service';
import { PasoDatosService } from './../../services/paso-datos.service';
import { Acciones, EventosService } from './../../services/eventos.service';
import { Crono } from './../../modelo/crono';
import { CronoService } from './crono.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Usuario } from 'projects/mobile/src/app/modelo/usuario';
import { SecurityService } from '../../services/security.service';
import { Db } from '../../services/db.service';
import { Partido } from '../../modelo/partido';

@Component({
  selector: 'app-crono',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.scss'],
})
export class CronoComponent implements OnInit, OnDestroy {

  @Input() partidoId: string; 
  @Input() equipoId: string;
  @Input() partes: number;
  @Input() segsParte: number;

  tiempo: Crono = {
    encendido: false,
    finParte: false,
    finPartido: false,
    parte: 1,
    segundos: 0
  };

  usuario: Usuario;

  constructor(private db: Db,
              private cronoService: CronoService,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService,
              private securityService: SecurityService,
              private alertController: AlertController) {}

  ngOnInit() {
    this.tiempo = this.cronoService.tiempo;
    this.usuario = this.securityService.getUsuario();
  }

  ngOnDestroy(){
    this.cronoService.reset();
  }

  pulsaCrono(){
    // Si es la primera vez que se pulsa (comienzo de partido) cambiamos el estado
    if (this.tiempo.segundos === 0 && this.tiempo.parte === 1){
      this.db.updatePartido( this.partidoId, { config: { estado: 'en curso' } } as Partido, {merge:true} );
      localStorage.setItem('estadoPartido', 'en curso');

      // Evento de comienzo de partido
      const evento = this.eventosService.newEvento();
      evento.accionPrincipal = Acciones.comienzoPartido;
      evento.partidoId = this.partidoId;
      evento.equipoId = this.equipoId;
      this.pasoDatos.onEventoJugador( evento );
    }

    if (this.tiempo.segundos === 0){
      // Es el comienzo de un periodo
      // Evento de comienzo de periodo
      const evento = this.eventosService.newEvento();
      evento.accionPrincipal = Acciones.comienzoPeriodo;
      evento.partidoId = this.partidoId;
      evento.equipoId = this.equipoId;
      this.pasoDatos.onEventoJugador( evento );
    }

    this.tiempo.encendido = !this.cronoService.pasoTiempo();
  }

  pulsaParte(){
    this.mostrarAlerta().then( resp => {
      console.log(resp);
      if (resp === 'confirm'){
        this.tiempo.finParte = true;
        this.tiempo.encendido = false;

        // Evento de fin de parte
        const evento = this.eventosService.newEvento();
        evento.accionPrincipal = Acciones.finPeriodo;
        evento.partidoId = this.partidoId;
        evento.equipoId = this.equipoId;
        this.pasoDatos.onEventoJugador( evento );

        if (this.tiempo.parte === this.partes) {
          // Es el final del partido
          this.finPartido();
        } else {
          this.tiempo.parte++;
          this.tiempo.segundos = 0;
          this.tiempo.finParte = false;
        }
      };
    });
  }

  finParte(){

    this.tiempo.parte++;
    this.tiempo.segundos = 0;
    this.tiempo.finParte = false;

    // Evento de fin de parte
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.finPeriodo;
    evento.partidoId = this.partidoId;
    evento.equipoId = this.equipoId;
    this.pasoDatos.onEventoJugador( evento );
  }

  finPartido(){
    this.tiempo.finPartido = true;

    // Evento de fin de partido
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.finPartido;
    evento.partidoId = this.partidoId;
    evento.equipoId = this.equipoId;
    this.pasoDatos.onEventoJugador( evento );

    // Dejamos el estado del partido como 'finalizado'
    this.db.updatePartido( this.partidoId, { config: { estado: 'finalizado' } } as Partido, {merge:true} );
    localStorage.setItem('estadoPartido', 'finalizado');
  }

  async mostrarAlerta(){
    const alert = await this.alertController.create({
      header: '¡¡¡ Atención !!! ',
      subHeader: '¿Realmente deseas finalizar el periodo en curso?',
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
}
