import { DailyIntakeComponent } from './daily-intake/daily-intake.component';
import { FoodInputComponent } from './food-input/food-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DailyIntakeComponent,
    FoodInputComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    DailyIntakeComponent,
    FoodInputComponent
  ]
})
export class FoodModule {}
