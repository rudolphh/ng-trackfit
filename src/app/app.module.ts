import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { DatePipe } from '@angular/common';
import { ForgotPasswordModule } from './feature/forgot-password/forgot-password.module';
import { HomeModule } from './feature/home/home.module';
import { LoginModule } from './feature/login/login.module';
import { MeasurementModule } from './feature/measurement/measurement.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterModule } from './feature/register/register.module';
import { SettingsModule } from './feature/settings/settings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, // imports CommonModule as well
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RegisterModule,
    LoginModule,
    SettingsModule,
    HomeModule,
    ForgotPasswordModule,
    MeasurementModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
