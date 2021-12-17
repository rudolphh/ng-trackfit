import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/_helpers/auth.guard';
import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { HomeComponent } from './feature/home/home.component';
import { LandingComponent } from './feature/home/landing/landing.component';
import { LoginComponent } from './feature/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './feature/register/register.component';
import { SettingsComponent } from './feature/settings/settings.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
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
