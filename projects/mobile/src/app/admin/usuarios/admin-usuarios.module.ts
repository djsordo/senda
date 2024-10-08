import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { AdminUsuariosPage } from "./admin-usuarios.page";
import { AdminUsuariosPageRoutingModule } from "./admin-usuarios-routing.module";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    IonicModule,
    AdminUsuariosPageRoutingModule],
  declarations : [
    AdminUsuariosPage, 
    BuscarComponent,
    CambioComponent
  ]
})
export class AdminUsuariosModule { }



