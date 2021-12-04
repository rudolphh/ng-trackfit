import { CalorieComponent } from './calorie/calorie.component';
import { CalorieIntakeComponent } from './calorie-intake/calorie-intake.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { LandingComponent } from './landing/landing.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatTooltipModule,
  ],
  providers: [DashboardService],
  exports: [CalorieComponent, CalorieIntakeComponent]
})
export class DashboardModule {}
