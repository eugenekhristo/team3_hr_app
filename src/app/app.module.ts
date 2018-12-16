import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthPageModule } from './pages/auth/auth-page.module';

import { AppComponent } from './app.component';
import { SystemPageModule } from './pages/system/system-page.module';
import {MaterialModule} from './ui/material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthPageModule,
    SystemPageModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
