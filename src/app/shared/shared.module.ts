import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CustomDatePickerComponent } from './components/custom-date-picker/custom-date-picker.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { GrowingSpinnerComponent } from './components/growing-spinner/growing-spinner.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    FieldErrorDisplayComponent,
    GrowingSpinnerComponent,
    CustomDatePickerComponent
   ],
   imports: [
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     MatCardModule,
     MatDatepickerModule,
     MatNativeDateModule,
   ],
   providers: [MatDatepickerModule],
   exports: [
     FieldErrorDisplayComponent,
     GrowingSpinnerComponent,
     CustomDatePickerComponent,
     CommonModule,
     ReactiveFormsModule,
     FormsModule
  ]
})
export class SharedModule {}
