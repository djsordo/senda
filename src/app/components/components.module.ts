import { CronoComponent } from './crono/crono.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CronoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CronoComponent]
})
export class ComponentsModule { }
