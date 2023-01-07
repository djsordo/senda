import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './home-routing.module';

import { EstadisticasPage } from './home.page';

@NgModule({
  declarations: [
    EstadisticasPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    EstadisticasPageRoutingModule
  ]
})
export class EstadisticasPageModule {}
