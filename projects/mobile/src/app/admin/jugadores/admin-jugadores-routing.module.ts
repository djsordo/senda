import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AdminJugadoresPage } from "./admin-jugadores.page";


const routes : Routes = [
  { path: '', component: AdminJugadoresPage }
];


@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class AdminJugadoresRoutingModule{}

