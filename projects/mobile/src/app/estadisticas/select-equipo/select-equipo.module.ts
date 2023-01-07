import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


import { SelectableCardListComponent } from "../../components/selectable-card-list/selectable-card-list.component";
import { SelectEquipoComponent } from "./select-equipo.component";


@NgModule({
  declarations: [
    SelectEquipoComponent,
    SelectableCardListComponent
  ], 
  imports : [
    CommonModule,
    IonicModule
  ],
  exports : []
})
export class SelectEquipoModule {}


