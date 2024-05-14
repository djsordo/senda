import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EstadisticasPageRoutingModule } from './home-routing.module';

import { EstadisticasPage } from './home.page';
import { SelectEquipoComponent } from '../select-equipo/select-equipo.component';
import { SelectableCardListModule } from '../../components/selectable-card-list/selectable-card-list.module';
import { SelectJugadorComponent } from '../select-jugador/select-jugador.component';
import { StatsEquipoComponent } from '../stats-equipo/stats-equipo.component';
import { StatsJugadorComponent } from '../stats-jugador/stats-jugador.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    EstadisticasPageRoutingModule, 
    SelectableCardListModule
  ],
  declarations: [
    EstadisticasPage,
    SelectEquipoComponent, 
    SelectJugadorComponent,
    StatsEquipoComponent,
    StatsJugadorComponent
  ]
})
export class EstadisticasPageModule {}
