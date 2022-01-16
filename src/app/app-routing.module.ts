import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { LoginComponent } from './feature/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './feature/register/register.component';
import { SettingsComponent } from './feature/settings/settings.component';

const routes: Routes = [
  // { path: '', component: LandingComponent },
  { path: '', loadChildren: () => import('./feature/home/home.module').then(m => m.HomeModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent }, //, canActivate: [AuthGuard] },
  { path: 'reset', component: ForgotPasswordComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
