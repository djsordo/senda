import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoJugadorPage } from './modo-jugador.page';

const routes: Routes = [
  {
    path: '',
    component: ModoJugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoJugadorPageRoutingModule {}
