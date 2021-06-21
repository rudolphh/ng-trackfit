import { EnvServiceProvider } from './_services/env.service.provider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { errorInterceptorProviders } from './_helpers/error.interceptor';
import { SettingsModule } from './settings/settings.module';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './dashboard/dashboard.module';
import { FieldErrorDisplayComponent } from './_components/field-error-display/field-error-display.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    SettingsModule,
    BrowserAnimationsModule,
    DashboardModule,
    FormsModule
   
    
  ],
  providers: [
    EnvServiceProvider,
    AuthService,
    authInterceptorProviders,
    errorInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
