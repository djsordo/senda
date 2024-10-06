import { AlertController } from '@ionic/angular';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { PasoDatosService } from './../../services/paso-datos.service';
import { Acciones, EventosService } from './../../services/eventos.service';
import { Usuario } from 'projects/mobile/src/app/modelo/usuario';
import { SecurityService } from '../../services/security.service';
import { Db } from '../../services/db.service';
import { Partido } from '../../modelo/partido';
import { CronoService } from './crono.service';

@Component({
  selector: 'app-crono',
  templateUrl: './crono.component.html',
  styleUrls: ['./crono.component.scss'],
})
export class CronoComponent implements OnInit, OnDestroy {

  @Input() partidoId: string; 
  @Input() equipoId: string;
  partes: number;
  segsParte: number;

  usuario: Usuario;

  constructor(private db: Db,
              public crono: CronoService,
              private eventosService: EventosService,
              private pasoDatos: PasoDatosService,
              private securityService: SecurityService,
              private alertController: AlertController) {
  }

  ngOnInit() {
    console.log( "ngOnInit crono.component.ts");
    this.usuario = this.securityService.getUsuario();
  }

  ngOnDestroy(){
    this.crono.reset();
  }

  pulsaCrono(){
    // Si es la primera vez que se pulsa (comienzo de partido) cambiamos el estado
    if (this.crono.esInicioPartido() ){
      this.db.updatePartido( this.partidoId, { config: { estado: 'en curso' } } as Partido, {merge:true} );
      localStorage.setItem('estadoPartido', 'en curso');

      // Evento de comienzo de partido
      const evento = this.eventosService.newEvento();
      evento.accionPrincipal = Acciones.comienzoPartido;
      evento.partidoId = this.partidoId;
      evento.equipoId = this.equipoId;
      this.pasoDatos.onEventoJugador( evento );
    }else{
      if (this.crono.esComienzoDeParte() ){
        // Es el comienzo de un periodo
        // Evento de comienzo de periodo
        const evento = this.eventosService.newEvento();
        evento.accionPrincipal = Acciones.comienzoPeriodo;
        evento.partidoId = this.partidoId;
        evento.equipoId = this.equipoId;
        this.pasoDatos.onEventoJugador( evento );
      }
    }

    this.crono.pulsaCrono();
  }

  pulsaParte(){
    this.mostrarAlerta().then( resp => {
      console.log(resp);
      if (resp === 'confirm'){

        this.crono.finParte();

        // Evento de fin de parte
        const evento = this.eventosService.newEvento();
        evento.accionPrincipal = Acciones.finPeriodo;
        evento.partidoId = this.partidoId;
        evento.equipoId = this.equipoId;
        this.pasoDatos.onEventoJugador( evento );

        if (this.crono.esFinalPartido()) {
          // Es el final del partido
          this.finPartido();
        } else {
          this.crono.inicioParte();
        }
      };
    });
  }

  finParte(){

    // Evento de fin de parte
    const evento = this.eventosService.newEvento();
    evento.accionPrincipal = Acciones.finPeriodo;
    evento.partidoId = this.partidoId;
    evento.equipoId = this.equipoId;
    this.pasoDatos.onEventoJugador( evento );

    this.crono.inicioParte();
  }

  finPartido(){
    this.crono.finPartido();

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
