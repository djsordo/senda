import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { CambioComponent } from "./cambio/cambio.component";
import { AdminUsuariosPage } from "./admin-usuarios.page";
import { AdminUsuariosRoutingModule } from "./admin-usuarios-routing.module";
import { SelectableCardListModule } from "../../components/selectable-card-list/selectable-card-list.module";


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AdminUsuariosRoutingModule,
    SelectableCardListModule
],
  declarations : [
    AdminUsuariosPage, 
    BuscarComponent,
    CambioComponent
  ]
})
export class AdminUsuariosModule { }



