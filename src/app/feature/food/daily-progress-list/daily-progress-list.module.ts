import { DailyProgressListComponent } from './daily-progress-list.component';
import { FoodModule } from '../food.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { SelectAllComponent } from './select-all/select-all.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SelectAllComponent,
    DailyProgressListComponent,
  ],
  imports: [
    SharedModule,
    FoodModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  exports: [DailyProgressListComponent],
})
export class DailyProgressListModule {}
