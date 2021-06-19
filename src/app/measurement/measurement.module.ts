import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';
import { MeasurementCreateEditComponent } from './measurement-create-edit/measurement-create-edit.component';



@NgModule({
  declarations: [
    MeasurementListComponent,
    MeasurementCreateEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MeasurementModule { }
