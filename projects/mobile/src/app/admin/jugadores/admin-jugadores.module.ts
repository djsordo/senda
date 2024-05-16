import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { AdminJugadoresRoutingModule } from "./admin-jugadores-routing.module";
import { AdminJugadoresPage } from "./admin-jugadores.page";


@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AdminJugadoresRoutingModule],
  declarations: [
    AdminJugadoresPage
  ]
})
export class AdminJugadoresModule{ }


