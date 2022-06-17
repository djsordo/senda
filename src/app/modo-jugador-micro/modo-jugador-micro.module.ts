import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModoJugadorMicroPageRoutingModule } from './modo-jugador-micro-routing.module';

import { ModoJugadorMicroPage } from './modo-jugador-micro.page';
import { MicrofonoComponent } from '../components/microfono/microfono.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModoJugadorMicroPageRoutingModule, 
    MicrofonoComponent
  ],
  declarations: [ModoJugadorMicroPage]
})
export class ModoJugadorMicroPageModule {}
