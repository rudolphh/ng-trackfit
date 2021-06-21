import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldErrorDisplayComponent } from '../_components/field-error-display/field-error-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    FieldErrorDisplayComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [FieldErrorDisplayComponent]
})
export class LoginModule { }
