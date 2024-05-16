import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { AdminUsuariosPage } from "./admin-usuarios.page";
import { AdminUsuariosRoutingModule } from "./admin-usuarios-routing.module";


@NgModule({
  imports : [ 
    CommonModule, 
    IonicModule,
    FormsModule, 
    ReactiveFormsModule,
    AdminUsuariosRoutingModule],
  declarations : [
    AdminUsuariosPage, 
    BuscarComponent,
    CambioComponent
  ]
})
export class AdminUsuariosModule { }



