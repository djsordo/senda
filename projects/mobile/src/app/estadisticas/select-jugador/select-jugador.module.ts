import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";


import { SelectableCardListComponent } from "../../components/selectable-card-list/selectable-card-list.component";
import { SelectJugadorComponent } from "./select-jugador.component";


@NgModule({
  declarations : [
    SelectJugadorComponent,
    SelectableCardListComponent
  ],
  imports : [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class SelectJugadorModule {}

