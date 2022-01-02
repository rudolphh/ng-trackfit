import { DailyProgressComponent } from './daily-progress/daily-progress.component';
import { DailyProgressListModule } from '../../food/daily-progress-list/daily-progress-list.module';
import { DashboardComponent } from './dashboard.component';
import { FoodModule } from '../../food/food.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VitalsComponent } from './vitals/vitals.component';

@NgModule({
  declarations: [
    DashboardComponent,
    VitalsComponent,
    DailyProgressComponent
  ],
  imports: [
    SharedModule,
    FoodModule,
    DailyProgressListModule,
    MatTooltipModule,
  ],
  providers: [],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
