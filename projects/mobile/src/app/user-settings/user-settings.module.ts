import { NgModule } from "@angular/core";


import { UserSettingsComponent } from "./user-settings.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";


const routes : Routes =  [
  {
    path: '', 
    component: UserSettingsComponent
  }
];

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule,
    RouterModule.forChild(routes)
  ], 
  declarations: [ UserSettingsComponent ]
})
export class UserSettingsModule {}

