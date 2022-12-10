import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSelJugadoresPage } from './inicio-sel-jugadores.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSelJugadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioSelJugadoresPageRoutingModule {}
