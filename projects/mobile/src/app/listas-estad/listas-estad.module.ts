import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListasEstadPageRoutingModule } from './listas-estad-routing.module';

import { ListasEstadPage } from './listas-estad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListasEstadPageRoutingModule
  ],
  declarations: [ListasEstadPage]
})
export class ListasEstadPageModule {}
