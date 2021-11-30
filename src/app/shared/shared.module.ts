import { CommonModule } from '@angular/common';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FieldErrorDisplayComponent
   ],
   imports: [
     CommonModule,
     ReactiveFormsModule
   ],
   exports: [
     FieldErrorDisplayComponent,
     CommonModule,
     ReactiveFormsModule
    ]
})
export class SharedModule {}
