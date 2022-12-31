import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './home-routing.module';

import { EstadisticasPage } from './home.page';
import { SelectableCardsComponent } from '../../components/selectable-cards/selectable-cards.component';

@NgModule({
  declarations: [
    EstadisticasPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadisticasPageRoutingModule
  ]
})
export class EstadisticasPageModule {}
