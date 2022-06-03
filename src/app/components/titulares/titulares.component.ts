import { PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverRoboComponent } from '../popover-robo/popover-robo.component';

@Component({
  selector: 'app-titulares',
  templateUrl: './titulares.component.html',
  styleUrls: ['./titulares.component.scss'],
})
export class TitularesComponent implements OnInit {
  titulares= [
    {
      numero: '55',
      nombre: 'Mario Palomo',
      portero: true,
    },
    {
      numero: '39',
      nombre: 'Santi Luna',
      portero: false,
    },
    {
      numero: '12',
      nombre: 'Javier de la Torre',
      portero: false,
    },
    {
      numero: '28',
      nombre: 'César Vitores',
      portero: false,
    },
    {
      numero: '29',
      nombre: 'Alex',
      portero: false,
    },
    {
      numero: '38',
      nombre: 'Gabri',
      portero: false,
    },
    {
      numero: '58',
      nombre: 'Óscar Otero',
      portero: false,
    },
  ];

  ev: Event;

  constructor(private router: Router,
              public popoverController: PopoverController) { }

  ngOnInit() {}

  irADetalle(){
    this.router.navigate(['/detalle-jugador']);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverRoboComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
