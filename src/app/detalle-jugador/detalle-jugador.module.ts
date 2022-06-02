import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleJugadorPageRoutingModule } from './detalle-jugador-routing.module';

import { DetalleJugadorPage } from './detalle-jugador.page';
import { PorteriaComponent } from '../components/jugador-porteria/porteria.component'; 
import { PorteriaSvgComponent } from '../components/porteria-svg/porteria-svg.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleJugadorPageRoutingModule
  ],
  declarations: [DetalleJugadorPage, 
    PorteriaComponent, 
    PorteriaSvgComponent ]
})
export class DetalleJugadorPageModule {}
