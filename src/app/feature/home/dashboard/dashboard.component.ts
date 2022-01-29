import {
  BehaviorSubject,
  Subject,
  Subscription,
  combineLatest,
  forkJoin,
  of,
} from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from '../../food/services/food-data.service';
import { HomeDataService } from '../home-data.service';
import { Measurement } from 'src/app/core/models/measurement';
import { MeasurementDataService } from '../../measurement/measurement-data.service';
import { SettingsDataService } from '../../settings/settings-data.service';
import { UserSettings } from 'src/app/core/models/user-settings';

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
  foods!: Food[];
  isLoading = false;
  inDemo = true;
  userSettings!: UserSettings;

  unsubscribed$ = new Subject<void>();

  constructor(
    private homeDataService: HomeDataService,
    private foodDataService: FoodDataService,
    private authService: AuthService,
    private measurementDataService: MeasurementDataService,
    private settingsDataService: SettingsDataService
  ) {
    this.inDemo = this.authService.currentUserValue ? false : true;

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

    combineLatest([
      this.settingsDataService.userSettings$,
      this.measurementDataService.measurements$,
    ])
      .pipe(takeUntil(this.unsubscribed$))
      .subscribe((data) => {
        console.log(data);
        const [userSettings, measurements] = data;
        if (measurements.length !== 0) {
          this.bodyWeightSubject$.next(measurements[0].weight);

          const lastBodyMeasurements = measurements.find((m) => {
            if (userSettings.gender === 'male') {
              return m.neck && m.waist;
            }
            return m.neck && m.hips && m.waist;
          });

          console.log('lastBodyMeasurements', lastBodyMeasurements);


          if (lastBodyMeasurements) {
            // can calculate bodyfat and use to better bmr * rate (cut or bulk)
            // use Katch-McArdle
            

          } else {
            // no last bodyfat calc, and use Mifflin-St.Jeor
          }
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
