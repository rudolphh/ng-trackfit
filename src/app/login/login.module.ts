import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayModule } from '../_components/field-error-display/field-error-display.module';


@NgModule({
  declarations: [
    
    LoginComponent
    
  
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FieldErrorDisplayModule
    
  ]
 
 
})
export class LoginModule { }
