import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { CrearComponent } from "./crear/crear.component";
import { AdminEquiposPage } from "./admin-equipos.page";
import { AdminEquiposPageRoutingModule } from "./admin-equipos-routing.module";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    AdminEquiposPageRoutingModule],
  declarations : [
    AdminEquiposPage, 
    BuscarComponent,
    CrearComponent,
    CambioComponent
  ]
})
export class AdminEquiposPageModule { }



