import { AccionGolesLanzComponent } from './accion-goles-lanz/accion-goles-lanz.component';
import { TitularesComponent } from './titulares/titulares.component';
import { MarcadorComponent } from './marcador/marcador.component';
import { CronoComponent } from './crono/crono.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ CronoComponent,
                  MarcadorComponent,
                  TitularesComponent,
                  AccionGolesLanzComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CronoComponent,
            MarcadorComponent,
            TitularesComponent,
            AccionGolesLanzComponent]
})
export class ComponentsModule { }
