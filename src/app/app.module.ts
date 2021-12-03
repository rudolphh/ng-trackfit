import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './feature/dashboard/dashboard.module';
import { ForgotPasswordModule } from './feature/forgot-password/forgot-password.module';
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
    DashboardModule,
    ForgotPasswordModule,
    MeasurementModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
