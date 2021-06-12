import { EnvServiceProvider } from './_services/env.service.provider';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';

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
    LoginModule
  ],
  providers: [EnvServiceProvider, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
