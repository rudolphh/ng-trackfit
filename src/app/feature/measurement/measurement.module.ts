import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MeasurementCreateEditComponent } from './measurement-create-edit/measurement-create-edit.component';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';
import { MeasurementRoutingModule } from './measurement-routing.module';
import { MeasurementService } from './measurement.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MeasurementListComponent,
    MeasurementCreateEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MeasurementRoutingModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule
  ],
  providers: [
    MeasurementService
  ]
})
export class MeasurementModule { }
