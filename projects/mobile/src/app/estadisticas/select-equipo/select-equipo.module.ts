import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


import { SelectableCardsComponent } from "../../components/selectable-cards/selectable-cards.component";
import { SelectEquipoComponent } from "./select-equipo.component";


@NgModule({
  declarations: [
    SelectEquipoComponent,
    SelectableCardsComponent
  ], 
  imports : [
    CommonModule,
    IonicModule
  ],
  exports : [
    SelectableCardsComponent
  ]
})
export class SelectEquipoModule {}


