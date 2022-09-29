import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadJugadorPage } from './estad-jugador.page';

const routes: Routes = [
  {
    path: '',
    component: EstadJugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadJugadorPageRoutingModule {}
