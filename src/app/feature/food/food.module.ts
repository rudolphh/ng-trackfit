import { DailyProgressListComponent } from './daily-progress-list/daily-progress-list.component';
import { DatePipe } from '@angular/common';
import { FoodInputComponent } from './food-input/food-input.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodService } from './food.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { RouterModule } from '@angular/router';
import { SelectAllComponent } from './select-all/select-all.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    DailyProgressListComponent,
    FoodInputComponent,
    FoodListComponent,
    SelectAllComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
  ],
  providers: [FoodService, DatePipe],
  exports: [
    DailyProgressListComponent,
    FoodInputComponent
  ]
})
export class FoodModule {}
