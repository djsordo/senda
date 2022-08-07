import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AdminClubesPageRoutingModule } from "./admin-clubes-routing.module";
import { AdminClubesPage } from "./admin-clubes.page";


@NgModule({
  imports : [ 
    CommonModule, 
    FormsModule, 
    IonicModule,
    AdminClubesPageRoutingModule],
  declarations : [
    AdminClubesPage
  ]
})
export class AdminClubesPageModule{}



