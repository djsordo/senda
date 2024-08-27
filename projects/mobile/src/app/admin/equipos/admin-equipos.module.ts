import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { EditarComponent } from "./editar/editar.component";
import { AdminEquiposPage } from "./admin-equipos.page";
import { AdminEquiposPageRoutingModule } from "./admin-equipos-routing.module";
import { SelectableCardListModule } from "../../components/selectable-card-list/selectable-card-list.module";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    AdminEquiposPageRoutingModule,
    SelectableCardListModule
  ],
  declarations : [
    AdminEquiposPage, 
    BuscarComponent,
    EditarComponent
  ]
})
export class AdminEquiposPageModule { }



