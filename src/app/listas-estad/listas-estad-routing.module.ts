import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListasEstadPage } from './listas-estad.page';

const routes: Routes = [
  {
    path: '',
    component: ListasEstadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListasEstadPageRoutingModule {}
