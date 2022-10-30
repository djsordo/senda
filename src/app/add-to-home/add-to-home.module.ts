import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddToHomePageRoutingModule } from './add-to-home-routing.module';

import { AddToHomePage } from './add-to-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddToHomePageRoutingModule
  ],
  declarations: [AddToHomePage]
})
export class AddToHomePageModule {

}
