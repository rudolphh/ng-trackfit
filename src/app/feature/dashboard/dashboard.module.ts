import { CalorieComponent } from './calorie/calorie.component';
import { CalorieIntakeComponent } from './calorie-intake/calorie-intake.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { LandingComponent } from './landing/landing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { VitalsComponent } from './vitals/vitals.component';

@NgModule({
  declarations: [
    CalorieComponent,
    CalorieIntakeComponent,
    DashboardComponent,
    LandingComponent,
    VitalsComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
  ],
  providers: [DashboardService],
  exports: [CalorieComponent, CalorieIntakeComponent]
})
export class DashboardModule {}
