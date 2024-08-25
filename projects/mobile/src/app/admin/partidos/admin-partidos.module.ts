import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { BuscarComponent } from "./buscar/buscar.component";
import { CrearComponent } from "./crear/crear.component";
import { AdminPartidosPage } from "./admin-partidos.page";
import { AdminPartidosPageRoutingModule } from "./admin-partidos-routing.module";
import { SelectEquipoComponent } from "./crear/select-equipo/select-equipo.component";
import { SelectRivalComponent } from "./crear/select-rival/select-rival.component";
import { PartidoInfoComponent } from "./crear/partido-info/partido-info.component";
import { SelectLugarComponent } from "./crear/select-lugar/select-lugar.component";
import { TimestampPipe } from "projects/mobile/src/app/services/timestamp-pipe";
import { SelectableCardListModule } from "../../components/selectable-card-list/selectable-card-list.module";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    AdminPartidosPageRoutingModule,
    SelectableCardListModule],
  declarations : [
    AdminPartidosPage, 
    BuscarComponent,
    CrearComponent,
    SelectEquipoComponent,
    SelectRivalComponent, 
    SelectLugarComponent,
    PartidoInfoComponent,
    TimestampPipe
  ]
})
export class AdminPartidosPageModule { }



