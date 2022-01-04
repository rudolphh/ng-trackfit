import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CustomDatePickerComponent } from './components/custom-date-picker/custom-date-picker.component';
import { DashCardComponent } from './components/dash-card/dash-card.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { GrowingSpinnerComponent } from './components/growing-spinner/growing-spinner.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SmoothHeightComponent } from './components/smooth-height/smooth-height.component';

@NgModule({
  declarations: [
    CustomDatePickerComponent,
    DashCardComponent,
    FieldErrorDisplayComponent,
    GrowingSpinnerComponent,
    NumbersOnlyDirective,
    ProgressBarComponent,
    SmoothHeightComponent
   ],
   imports: [
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     MatCardModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatProgressBarModule,
   ],
   providers: [MatDatepickerModule],
   exports: [
     CustomDatePickerComponent,
     DashCardComponent,
     FieldErrorDisplayComponent,
     GrowingSpinnerComponent,
     CommonModule,
     ReactiveFormsModule,
     FormsModule,
     NumbersOnlyDirective,
     ProgressBarComponent,
     SmoothHeightComponent
  ]
})
export class SharedModule {}
