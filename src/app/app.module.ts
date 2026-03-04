import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';

// reCaptcha
import { RecaptchaModule } from 'angular-google-recaptcha';

// Modulos
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasajerosChipsComponent } from './pages/pasajeros/pasajeros-chips/pasajeros-chips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../app/material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatChipsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatExpansionModule,
    AuthModule,
    AppRoutingModule,
    RecaptchaModule.forRoot({
      siteKey: '6LdS-MgZAAAAAMRN98PdIODHP27BJGiRHqRAgVga',
    }),
    PagesModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
