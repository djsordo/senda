import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadJugadorPageRoutingModule } from './estad-jugador-routing.module';

import { EstadJugadorPage } from './estad-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadJugadorPageRoutingModule
  ],
  declarations: [EstadJugadorPage]
})
export class EstadJugadorPageModule {}
