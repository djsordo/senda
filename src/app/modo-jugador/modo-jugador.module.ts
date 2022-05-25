import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModoJugadorPageRoutingModule } from './modo-jugador-routing.module';

import { ModoJugadorPage } from './modo-jugador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModoJugadorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModoJugadorPage]
})
export class ModoJugadorPageModule {}
