import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingComponent } from './dashboard/landing/landing.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeasurementListComponent } from './measurement/measurement-list/measurement-list.component';
import { MeasurementCreateEditComponent } from './measurement/measurement-create-edit/measurement-create-edit.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ForgotPasswordComponent},
  //{ path: 'friends', component: FriendsComponent},
  { path: 'measurements', component: MeasurementListComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: MeasurementCreateEditComponent },
      { path: 'edit/:id', component: MeasurementCreateEditComponent }
    ]
  },
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
