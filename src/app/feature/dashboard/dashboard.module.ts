import { CalorieComponent } from './calorie/calorie.component';
import { CalorieIntakeComponent } from './calorie-intake/calorie-intake.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { LandingComponent } from './landing/landing.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CalorieComponent,
    CalorieIntakeComponent,
    DashboardComponent,
    LandingComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
  ],
  providers: [DashboardService],
  exports: [CalorieComponent, CalorieIntakeComponent]
})
export class DashboardModule {}
