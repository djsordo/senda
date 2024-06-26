import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AdminClubesPageRoutingModule } from "./admin-clubes-routing.module";
import { AdminClubesPage } from "./admin-clubes.page";
import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { CrearComponent } from "./crear/crear.component";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    AdminClubesPageRoutingModule],
  declarations : [
    AdminClubesPage, 
    BuscarComponent,
    CrearComponent,
    CambioComponent
  ]
})
export class AdminClubesPageModule { }



