import { MarcadorService } from './../components/marcador/marcador.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PasoDatosService } from '../services/paso-datos.service';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {

  area_campo = '';
  area_porteria = '';

  constructor(private toastController: ToastController,
    private router: Router,
    private marcadorService: MarcadorService,
    private pasoDatos: PasoDatosService) {}

  detalle: any;

  ngOnInit() {
    this.detalle = this.pasoDatos.getPantallaDetalle();
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
}
