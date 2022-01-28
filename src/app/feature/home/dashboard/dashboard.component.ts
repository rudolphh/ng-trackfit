import { BehaviorSubject, Subject, Subscription, of } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from '../../food/services/food-data.service';
import { HomeDataService } from '../home-data.service';
import { Measurement } from 'src/app/core/models/measurement';
import { MeasurementDataService } from '../../measurement/measurement-data.service';
import { UserService } from '../../../core/services/user.service';

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

  bodyFatSubject$ = new BehaviorSubject<number>(0.0);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  foods !: Food[];

  isLoading = false;
  inDemo = true;

  unsubscribed$ = new Subject<void>();

  constructor(
    private homeDataService: HomeDataService,
    private foodDataService: FoodDataService,
    private authService: AuthService,
    private measurementDataService: MeasurementDataService,
    private userService: UserService
  ) {

    this.inDemo = this.authService.currentUserValue ? false : true;

    // set initial date for entire dashboard
    this.homeDataService.setCurrentDate(new Date());

    this.homeDataService.currentDate
      .pipe(
        takeUntil(this.unsubscribed$),
        mergeMap((date: Date) => {
          this.initialDate = date;
          this.isLoading = true;
          return of(date);
        }),
        switchMap((date: Date) => {
          return this.foodDataService.changeDate(date);
        })
      )
      .subscribe((foods) => {
        // every date change we need all other date related data changes to go here
          this.isLoading = false;
      });

    this.foodDataService.todaysFood$.subscribe((foods) => {
      this.foods = foods;
    });

    this.measurementDataService.measurements$.subscribe((measurements) => {
      console.log(measurements);
      if (measurements.length !== 0) {
        this.bodyWeightSubject$.next(measurements[0].weight);


        this.bodyFatSubject$.next(0.01);
      }
    });
  }

  measurementAdded(measurement: Measurement): void {
    console.log(measurement);
    this.measurementDataService.addMeasurement(measurement);
  }

  // on destroy
  ngOnDestroy(): void {
    this.unsubscribed$.next();
    this.unsubscribed$.complete();
  }
}
