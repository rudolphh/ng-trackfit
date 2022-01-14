import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { FoodDataService } from '../../food/services/food-data.service';
import { HomeDataService } from '../home-data.service';
import { MeasurementDataService } from '../../measurement/measurement-data.service';
import { takeUntil } from 'rxjs/operators';
import { textChangeRangeIsUnchanged } from 'typescript';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnDestroy {
  user$ = this.authService.currentUser;
  initialDate!: Date;

  bodyWeightSubject$ = new BehaviorSubject<number>(0);
  bodyWeight$ = this.bodyWeightSubject$.asObservable();

  bodyFatSubject$ = new BehaviorSubject<number>(0.00);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  isLoading = false;

  unsubscribed$ = new Subject<void>();

  constructor(
    private homeDataService: HomeDataService,
    private foodDataService: FoodDataService,
    private authService: AuthService,
    private measurementDataService: MeasurementDataService
  ) {
    // set initial date for entire dashboard
    this.homeDataService.setCurrentDate(new Date());

    this.homeDataService.currentDate
      .pipe(takeUntil(this.unsubscribed$))
      .subscribe((date: Date) => {
        // every date change we need all other date related data changes to go here
        this.initialDate = date;

        this.isLoading = true;

        this.foodDataService.changeDate(date).subscribe(() => {
          this.isLoading = false;
        });
      });

    this.measurementDataService.getAllMeasurements().subscribe(measurements => {
      this.bodyWeightSubject$.next(measurements[0].weight);
      // TODO: calculate bodyfat (with body measurements if any)
      this.bodyFatSubject$.next(0.01);
    })
  }


  ngOnDestroy(): void {
    this.unsubscribed$.next();
    this.unsubscribed$.complete();
  }
}
