import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';
import { MeasurementCreateEditComponent } from './measurement-create-edit/measurement-create-edit.component';
import { MeasurementService } from '../_services/measurement.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MeasurementListComponent,
    MeasurementCreateEditComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    ReactiveFormsModule
  ],
  providers: [MeasurementService]
})
export class MeasurementModule { }
