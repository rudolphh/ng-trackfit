import { CheckInComponent } from './check-in/check-in.component';
import { DailyMacrosComponent } from './daily-macros/daily-macros.component';
import { DailyProgressComponent } from './daily-progress/daily-progress.component';
import { DashboardComponent } from './dashboard.component';
import { FoodListModule } from '../../food/food-list/food-list.module';
import { FoodModule } from '../../food/food.module';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MeasurementModule } from '../../measurement/measurement.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { VitalsModule } from './vitals/vitals.module';

@NgModule({
  declarations: [
    CheckInComponent,
    DashboardComponent,
    DailyProgressComponent,
    DailyMacrosComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    FoodModule,
    FoodListModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MeasurementModule,
    MatProgressBarModule,
    VitalsModule,
  ],
  providers: [],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {}
