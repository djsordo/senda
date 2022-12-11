import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { TestService } from './service/test.service';

@NgModule({
  declarations: [AppComponent,
    TestComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent,
            TestComponent]
})
export class AppModule { }

