import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { PrivacyComponent } from "./privacy.component";
import { RouterModule, Routes } from "@angular/router";
import { PrivacyEsComponent } from "./es/privacy-es.component";

/**
 * Rutas hijas
 */
 const routes : Routes = [
  { path : '', component : PrivacyComponent, children : [
    { path : '', redirectTo : 'es' },
    { path : 'es', component : PrivacyEsComponent }
  ] }, 
];

@NgModule({
  imports : [
    CommonModule, 
    FormsModule,
    IonicModule,
    RouterModule.forChild( routes ) ], 
  declarations : [
    PrivacyComponent, 
    PrivacyEsComponent
  ], 
  exports : [
    RouterModule
  ]
})
export class PrivacyModule { }
