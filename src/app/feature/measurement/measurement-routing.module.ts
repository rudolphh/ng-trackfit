import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/_helpers/auth.guard';
import { MeasurementComponent } from './measurement.component';
import { MeasurementCreateEditComponent } from './measurement-create-edit/measurement-create-edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'measurements', component: MeasurementComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'new', component: MeasurementCreateEditComponent },
      { path: 'edit/:id', component: MeasurementCreateEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementRoutingModule {}
