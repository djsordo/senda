import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";


import { SelectableCardListComponent } from "./selectable-card-list.component";

@NgModule({
  declarations: [
    SelectableCardListComponent
  ], 
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SelectableCardListComponent
  ]
})
export class SelectableCardListModule { }

