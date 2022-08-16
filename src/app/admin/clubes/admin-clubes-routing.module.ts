import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { AdminClubesPage } from "./admin-clubes.page";
import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { CrearComponent } from "./crear/crear.component";

/**
 * Estas son las rutas "hijas" de /admin/clubes que vamos a definir: 
 * 
 */
const routes : Routes = [
  { path : '', component : AdminClubesPage, children : [
    /* componente por defecto que se cargará en la pagina */
    { path : '',       component : BuscarComponent }, 
    { path : 'buscar', component : BuscarComponent },
    { path : 'cambio', component : CambioComponent }, 
    { path : 'nuevo',  component : CrearComponent  }
  ] } 
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminClubesPageRoutingModule{}

