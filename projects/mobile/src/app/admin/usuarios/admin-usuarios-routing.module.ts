import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { AdminUsuariosPage } from "./admin-usuarios.page";
import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";

/**
 * Estas son las rutas "hijas" de /admin/usuarios que apuntan a los 
 * componentes encargados de las diferentes operaciones
 */
const routes : Routes = [
  { path : '', component : AdminUsuariosPage, children : [
    /* componente por defecto que se cargará en la página */
    { path : '',       component : BuscarComponent },
    { path : 'buscar', component : BuscarComponent },
    { path : 'cambio/:userId', component : CambioComponent },
    { path : 'nuevo',  component : CambioComponent  }
  ] }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminUsuariosRoutingModule{}

