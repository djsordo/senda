import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StylesService } from './services/styles.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
    ],
  providers: [{ provide: RouteReuseStrategy, 
                useClass: IonicRouteStrategy },
              StylesService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
