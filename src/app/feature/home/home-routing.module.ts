import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/_helpers/auth.guard';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    //canActivate: [AuthGuard],
    // children: [
    //   { path: 'new', component: MeasurementCreateEditComponent },
    //   { path: 'edit/:id', component: MeasurementCreateEditComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
