import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { TestService } from './service/test.service';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TestComponent,
            TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

