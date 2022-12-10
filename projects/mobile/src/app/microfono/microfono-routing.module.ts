import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MicrofonoPage } from './microfono.page';

const routes: Routes = [
  {
    path: '',
    component: MicrofonoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MicrofonoPageRoutingModule {}
