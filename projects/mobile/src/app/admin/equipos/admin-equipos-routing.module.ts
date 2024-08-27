import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { AdminEquiposPage } from "./admin-equipos.page";
import { BuscarComponent } from "./buscar/buscar.component";
import { EditarComponent } from "./editar/editar.component";

/**
 * Estas son las rutas "hijas" de /admin/equipos que apuntan a los 
 * componentes encargados de las diferentes operaciones
 */
const routes : Routes = [
  { path : '', component : AdminEquiposPage, children : [
    /* componente por defecto que se cargará en la página */
    { path : '',       component : BuscarComponent },
    { path : 'buscar', component : BuscarComponent },
    { path : 'cambio/:equipoId', component : EditarComponent },
    { path : 'nuevo',  component : EditarComponent  }
  ] }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminEquiposPageRoutingModule{}

