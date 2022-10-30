import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddToHomePage } from './add-to-home.page';

const routes: Routes = [
  {
    path: '',
    component: AddToHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddToHomePageRoutingModule {}
