import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { CrearComponent } from "./crear/crear.component";
import { AdminPartidosPage } from "./admin-partidos.page";
import { AdminPartidosPageRoutingModule } from "./admin-partidos-routing.module";
import { UsefulDatePipe } from "src/app/services/usefulDate.pipe";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    AdminPartidosPageRoutingModule],
  declarations : [
    AdminPartidosPage, 
    BuscarComponent,
    CrearComponent,
    CambioComponent,
    UsefulDatePipe
  ]
})
export class AdminPartidosPageModule { }



