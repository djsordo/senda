import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModoVerPage } from './modo-ver.page';

const routes: Routes = [
  {
    path: '',
    component: ModoVerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModoVerPageRoutingModule {}
