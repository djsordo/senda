import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


import { SelectableCardListComponent } from "../../components/selectable-card-list/selectable-card-list.component";
import { SelectableCardComponent } from "../../components/selectable-card/selectable-card.component";
import { SelectEquipoComponent } from "./select-equipo.component";


@NgModule({
  declarations: [
    SelectEquipoComponent,
    SelectableCardComponent, 
    SelectableCardListComponent
  ], 
  imports : [
    CommonModule,
    IonicModule
  ],
  exports : [
    SelectableCardComponent
  ]
})
export class SelectEquipoModule {}


