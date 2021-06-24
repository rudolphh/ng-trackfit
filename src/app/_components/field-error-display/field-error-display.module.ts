import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from './field-error-display.component';



@NgModule({
  declarations: [
    
   FieldErrorDisplayComponent
    
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[FieldErrorDisplayComponent]
 
})
export class FieldErrorDisplayModule { }
