import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from './_services/auth.service';
import { LandingComponent } from './dashboard/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  //{ path: 'home', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'profile', component: ProfileComponent },
  //{ path: 'settings', component: SettingsComponent },
  { path: 'reset', component: ForgotPasswordComponent},
  //{ path: 'friends', component: FriendsComponent},
 // { path: 'measurements/:id', component: MeasurementDetailsComponent },
 // { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
