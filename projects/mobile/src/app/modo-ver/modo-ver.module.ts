import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModoVerPageRoutingModule } from './modo-ver-routing.module';

import { ModoVerPage } from './modo-ver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModoVerPageRoutingModule
  ],
  declarations: [ModoVerPage]
})
export class ModoVerPageModule {}
