import { DailyMacrosComponent } from './daily-macros/daily-macros.component';
import { DailyProgressComponent } from './daily-progress/daily-progress.component';
import { DashboardComponent } from './dashboard.component';
import { FoodListModule } from '../../food/food-list/food-list.module';
import { FoodModule } from '../../food/food.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { VitalsComponent } from './vitals/vitals.component';

@NgModule({
  declarations: [
    DashboardComponent,
    VitalsComponent,
    DailyProgressComponent,
    DailyMacrosComponent
  ],
  imports: [
    SharedModule,
    FoodModule,
    FoodListModule,
    MatTooltipModule,
  ],
  providers: [],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
