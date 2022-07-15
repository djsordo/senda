import { MarcadorService } from './../components/marcador/marcador.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


import { Jugador } from '../modelo/jugador';
import { PasoDatosService } from '../services/paso-datos.service';
import { BalonmanoService } from '../services/balonmano.service';
import { EventosService } from '../services/eventos.service';
import { TradService } from '../services/trad.service';


@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {

  private area_campo = '';
  private area_porteria = '';
  private accion = ''; 
  private jugador: Jugador = null;

  constructor(private toastController: ToastController,
    private router: Router,
    private marcadorService: MarcadorService,
    private pasoDatos: PasoDatosService, 
    public balonmanoService : BalonmanoService, 
    private eventosService : EventosService,
    private trad : TradService ) {}

  detalle: any;

  ngOnInit() {
    this.accion = this.pasoDatos.getPantalla("detalle-jugador").accion;
    this.jugador = this.pasoDatos.getPantalla("detalle-jugador").jugador;
  }

  public onCampoClicked( event : string ){
    console.log( event );
    this.area_campo = event;
  }

  public onPorteriaClicked( event : string ){
    console.log( event );
    this.area_porteria = event;
  }

  btnOk(){
    if (this.detalle.accion === 'gol'){
      this.marcadorService.gol();
    } else if (this.detalle.accion === 'gol rival'){
      this.marcadorService.golRival();
    }

    const mensaje = this.detalle.accion + ' de ' + this.detalle.idJugador + ' desde el ' + this.area_campo + ' que ha entrado por el ' + this.area_porteria;
    this.toastOk(mensaje);
    this.router.navigate(['/modo-jugador']);
  }

  async toastOk(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

  public getTituloPagina() {
    return `${this.trad.t('accion.'+this.accion)} de ${this.jugador.nombre}`;
  }
}
