import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModoAccionPageRoutingModule } from './modo-accion-routing.module';

import { ModoAccionPage } from './modo-accion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModoAccionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModoAccionPage]
})
export class ModoAccionPageModule {}
