import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectEquipoComponent } from '../select-equipo/select-equipo.component';
import { SelectJugadorComponent } from '../select-jugador/select-jugador.component';
import { StatsJugadorComponent } from '../stats-jugador/stats-jugador.component';

import { EstadisticasPage } from './home.page';

const routes: Routes = [
  {path: '', component: EstadisticasPage, children : [
    /* punto de inicio de la pagina */
    {path: '',              component: SelectEquipoComponent },
    {path: 'select-equipo', component: SelectEquipoComponent },
    {path: 'select-jugador/:equipoId', component: SelectJugadorComponent },
    {path: 'stats-jugador/:jugadorId', component: StatsJugadorComponent }
   ]} 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadisticasPageRoutingModule {}
