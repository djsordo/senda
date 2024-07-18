import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { AdminJugadoresRoutingModule } from "./admin-jugadores-routing.module";
import { AdminJugadoresPage } from "./admin-jugadores.page";
import { BuscarComponent } from "./buscar/buscar.component";
import { EquipoPipe } from "../../pipes/equipo.pipe";
import { EditarComponent } from "./editar/editar.component";


@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AdminJugadoresRoutingModule],
  declarations: [
    EquipoPipe, 
    AdminJugadoresPage, 
    BuscarComponent, 
    EditarComponent
  ]
})
export class AdminJugadoresModule{ }


