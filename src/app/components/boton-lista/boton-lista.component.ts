import { ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boton-lista',
  templateUrl: './boton-lista.component.html',
  styleUrls: ['./boton-lista.component.scss'],
})
export class BotonListaComponent implements OnInit {
  @Input() nombreBoton: string;
  @Input() lista: any;
  @Input() numJugador: string;
  @Input() icono: string;
  @Input() colorBoton: string;

  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  eleccion(accion2: any, accion1: any){
    this.toastElegido(accion1 + ' - ' + accion2);
    console.log(accion1);
    console.log(accion2);
  }

  async toastElegido(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
