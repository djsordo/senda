import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { AdminEquiposPage } from "./admin-equipos.page";

const routes : Routes = [
  {
    path : '', 
    component : AdminEquiposPage
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminEquiposPageRoutingModule{}

