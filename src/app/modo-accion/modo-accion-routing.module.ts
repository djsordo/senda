import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoAccionPage } from './modo-accion.page';

const routes: Routes = [
  {
    path: '',
    component: ModoAccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoAccionPageRoutingModule {}
