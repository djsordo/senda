import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { AdminClubesPage } from "./admin-clubes.page";

const routes : Routes = [
  {
    path : '', 
    component: AdminClubesPage
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminClubesPageRoutingModule{}

