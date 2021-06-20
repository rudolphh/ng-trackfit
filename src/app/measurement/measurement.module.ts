import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';
import { MeasurementCreateEditComponent } from './measurement-create-edit/measurement-create-edit.component';
import { MeasurementService } from '../_services/measurement.service';



@NgModule({
  declarations: [
    MeasurementListComponent,
    MeasurementCreateEditComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [MeasurementService]
})
export class MeasurementModule { }
