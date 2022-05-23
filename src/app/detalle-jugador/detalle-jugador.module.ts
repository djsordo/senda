import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleJugadorPageRoutingModule } from './detalle-jugador-routing.module';

import { DetalleJugadorPage } from './detalle-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleJugadorPageRoutingModule
  ],
  declarations: [DetalleJugadorPage]
})
export class DetalleJugadorPageModule {}
