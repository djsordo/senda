import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { CrearComponent } from "./crear/crear.component";
import { AdminUsuariosPage } from "./admin-usuarios.page";
import { AdminUsuariosPageRoutingModule } from "./admin-usuarios-routing.module";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    AdminUsuariosPageRoutingModule],
  declarations : [
    AdminUsuariosPage, 
    BuscarComponent,
    CrearComponent,
    CambioComponent
  ]
})
export class AdminEquiposPageModule { }



