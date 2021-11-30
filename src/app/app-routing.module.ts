import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { LandingComponent } from './feature/dashboard/landing/landing.component';
import { LoginComponent } from './feature/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './feature/register/register.component';
import { SettingsComponent } from './feature/settings/settings.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ForgotPasswordComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
