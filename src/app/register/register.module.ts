import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

import { FieldErrorDisplayModule } from '../_components/field-error-display/field-error-display.module';


@NgModule({
  declarations: [  
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldErrorDisplayModule
    
  ],
  
})
export class RegisterModule { }
