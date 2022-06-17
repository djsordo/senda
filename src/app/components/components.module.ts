import { BotonListaComponent } from './boton-lista/boton-lista.component';
import { AccionCambiosComponent } from './accion-cambios/accion-cambios.component';
import { AccionSancionesComponent } from './accion-sanciones/accion-sanciones.component';
import { AccionGolesLanzComponent } from './accion-goles-lanz/accion-goles-lanz.component';
import { TitularesComponent } from './titulares/titulares.component';
import { MarcadorComponent } from './marcador/marcador.component';
import { CronoComponent } from './crono/crono.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [ CronoComponent,
                  MarcadorComponent,
                  TitularesComponent,
                  AccionGolesLanzComponent,
                  AccionSancionesComponent,
                  AccionCambiosComponent,
                  BotonListaComponent
                ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CronoComponent,
            MarcadorComponent,
            TitularesComponent,
            AccionGolesLanzComponent,
            AccionSancionesComponent,
            AccionCambiosComponent,
            BotonListaComponent
            ]
})
export class ComponentsModule { }
