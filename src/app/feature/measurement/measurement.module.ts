import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MeasurementComponent } from './measurement.component';
import { MeasurementCreateEditComponent } from './measurement-create-edit/measurement-create-edit.component';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';
import { MeasurementRoutingModule } from './measurement-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MeasurementListComponent,
    MeasurementCreateEditComponent,
    MeasurementComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MeasurementRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  providers: []
})
export class MeasurementModule { }
