import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { AdminPartidosPage } from "./admin-partidos.page";
import { BuscarComponent } from "./buscar/buscar.component";
import { CrearComponent } from "./crear/crear.component";
import { PartidoInfoComponent } from "./crear/partido-info/partido-info.component";
import { SelectEquipoComponent } from "./crear/select-equipo/select-equipo.component";
import { SelectLugarComponent } from "./crear/select-lugar/select-lugar.component";
import { SelectRivalComponent } from "./crear/select-rival/select-rival.component";


/**
 * Estas son las rutas "hijas" de /admin/usuarios que apuntan a los 
 * componentes encargados de las diferentes operaciones
 */
const routes : Routes = [
  { path : '', component : AdminPartidosPage, children : [
    /* componente por defecto que se cargará en la página */
    { path : '',       component : BuscarComponent },
    { path : 'buscar', component : BuscarComponent },
    { path : 'cambio/:partidoId', 
      component : CrearComponent,
      children : [
        /*{ path : '', redirectTo: 'equipo' },*/
        { path : 'salir',  redirectTo: '/admin/partidos' },
        { path : 'equipo', component : SelectEquipoComponent }, 
        { path : 'rival',  component : SelectRivalComponent },
        { path : 'lugar',  component : SelectLugarComponent },
        { path : 'info',   component : PartidoInfoComponent }
      ] },
    { path : 'nuevo',  
      component : CrearComponent, 
      children : [
        { path : '', redirectTo: 'equipo', pathMatch: 'full' },
        { path : 'salir',  redirectTo: '/admin/partidos' },
        { path : 'equipo', component : SelectEquipoComponent }, 
        { path : 'rival',  component : SelectRivalComponent },
        { path : 'lugar',  component : SelectLugarComponent },
        { path : 'info',   component : PartidoInfoComponent }
      ] }
  ] }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminPartidosPageRoutingModule{}

