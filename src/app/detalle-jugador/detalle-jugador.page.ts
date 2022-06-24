import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-jugador',
  templateUrl: './detalle-jugador.page.html',
  styleUrls: ['./detalle-jugador.page.scss'],
})
export class DetalleJugadorPage implements OnInit {

  area_campo = '';
  area_porteria = '';

  constructor(private toastController: ToastController,
    private router: Router) {}

  ngOnInit() {}

  public onCampoClicked( event : string ){
    console.log( event );
    this.area_campo = event;
  }

  public onPorteriaClicked( event : string ){
    console.log( event );
    this.area_porteria = event;
  }

  btnOk(){
    const mensaje = 'Gol de xxx desde el ' + this.area_campo + ' que ha entrado por el ' + this.area_porteria;
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
