import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSelJugadoresPageRoutingModule } from './inicio-sel-jugadores-routing.module';

import { InicioSelJugadoresPage } from './inicio-sel-jugadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSelJugadoresPageRoutingModule
  ],
  declarations: [InicioSelJugadoresPage]
})
export class InicioSelJugadoresPageModule {}
