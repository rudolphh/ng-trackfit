import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalorieComponent } from './calorie/calorie.component';
import { CalorieIntakeComponent } from './calorie-intake/calorie-intake.component';
import { MatIconModule } from '@angular/material/icon';
import { LandingComponent } from './landing/landing.component';
import { DashboardService } from './dashboard.service';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    CalorieComponent,
    CalorieIntakeComponent,
    DashboardComponent,
    LandingComponent,
  ],
  imports: [CommonModule, MatIconModule],
  providers: [DashboardService],
  exports: [CalorieComponent, CalorieIntakeComponent]
})
export class DashboardModule {}
