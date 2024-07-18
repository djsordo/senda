import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AdminJugadoresPage } from "./admin-jugadores.page";
import { BuscarComponent } from "./buscar/buscar.component";
import { EditarComponent } from "./editar/editar.component";


const routes : Routes = [
  { path: '', component: AdminJugadoresPage, children: [
    { path: '',       component: BuscarComponent, pathMatch: "full" }, 
    { path: 'buscar', component: BuscarComponent }, 
    { path: 'cambio/:userId', component: EditarComponent },
    { path: 'nuevo',  component: EditarComponent }
  ] }
];


@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class AdminJugadoresRoutingModule{}

