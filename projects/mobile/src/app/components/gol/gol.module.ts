import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DetalleJugadorPageRoutingModule } from './gol-routing.module';
import { GolPage } from './gol.page';
import { MapaComponent } from '../mapa/mapa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleJugadorPageRoutingModule
  ],
  declarations: [
    GolPage, 
    MapaComponent ]
})
export class GolPageModule {}
