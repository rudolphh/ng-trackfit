import { EnvServiceProvider } from './_services/env.service.provider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './_components/nav/nav.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { SettingsModule } from './settings/settings.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { MeasurementModule } from './measurement/measurement.module';

import { RegisterModule } from './register/register.module';
import { FieldErrorDisplayModule } from './_components/field-error-display/field-error-display.module';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { errorInterceptorProviders } from './_helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FieldErrorDisplayModule,
    RegisterModule,
    LoginModule,
    SettingsModule,
    DashboardModule,
    MeasurementModule,
  ],
  providers: [
    authInterceptorProviders,
    errorInterceptorProviders,
    EnvServiceProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
