import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoJugadorMicroPage } from './modo-jugador-micro.page';

const routes: Routes = [
  {
    path: '',
    component: ModoJugadorMicroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoJugadorMicroPageRoutingModule {}
