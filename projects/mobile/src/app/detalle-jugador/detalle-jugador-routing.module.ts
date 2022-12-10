import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleJugadorPage } from './detalle-jugador.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleJugadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleJugadorPageRoutingModule {}
