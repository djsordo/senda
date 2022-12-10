import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MicrofonoPageRoutingModule } from './microfono-routing.module';

import { MicrofonoPage } from './microfono.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MicrofonoPageRoutingModule
  ],
  declarations: [MicrofonoPage]
})
export class MicrofonoPageModule {}
