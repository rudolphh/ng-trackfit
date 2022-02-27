import {
  Observable,
  Subject,
  combineLatest,
  of,
} from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from '../../food/services/food-data.service';
import { HomeDataService } from '../home-data.service';
import { Measurement } from 'src/app/core/models/measurement';
import { MeasurementDataService } from '../../measurement/measurement-data.service';
import { SettingsDataService } from '../../settings/settings-data.service';
import { UserSettings } from 'src/app/core/models/user-settings';
import { VitalsDataService } from './vitals/vitals-data.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnDestroy {
  user$ = this.authService.currentUser;
  currentDate!: Date;
  foods$ !: Observable<Food[]>;
  isLoading = false;
  inDemo = true;
  userSettings!: UserSettings;
  maxCalories = 1800;

  unsubscribed$ = new Subject<void>();

  bodyWeight$ = this.vitalsDataService.bodyWeight$;
  bodyFat$ = this.vitalsDataService.bodyFat$;
  leanBodyMass$ = this.vitalsDataService.leanBodyMass$;
  bmr$ = this.vitalsDataService.bmr$;

  constructor(
    private homeDataService: HomeDataService,
    private foodDataService: FoodDataService,
    private authService: AuthService,
    private measurementDataService: MeasurementDataService,
    private settingsDataService: SettingsDataService,
    private vitalsDataService: VitalsDataService
  ) {
    this.inDemo = this.authService.currentUserValue ? false : true;

    this.homeDataService.currentDate
      .pipe(
        takeUntil(this.unsubscribed$),
        mergeMap((date: Date) => {
          this.currentDate = date;
          this.isLoading = true;
          return of(date);
        }),
        switchMap((date: Date) => {
          console.log(date);
          return this.foodDataService.changeDate(date);
        })
      )
      .subscribe((foods) => {
        // every date change we need all other date related data changes to go here
        this.isLoading = false;
      });

    this.foods$ = this.foodDataService.todaysFood$;

    combineLatest([
      this.settingsDataService.userSettings$,
      this.measurementDataService.measurements$,
    ])
      .pipe(takeUntil(this.unsubscribed$))
      .subscribe((data) => {

        const [userSettings, measurements] = data;
        this.userSettings = userSettings;
        let { height, rate, gender, birthDate } = userSettings;
        height *= 2.54;

        let bmr;
        let bf;

        if (measurements.length !== 0) {
          console.log(measurements)
          let { weight } = measurements[0];
          weight /= 2.20462262; // 1kg = 2.20462262 lbs
          this.vitalsDataService.setBodyWeight(measurements[0].weight);

          const lastBodyMeasurements = measurements.find((m) => {
            if (userSettings.gender === 'male') {
              return m.neck && m.waist;
            }
            return m.neck && m.waist && m.hips;
          });

          if (lastBodyMeasurements) {
            // can calculate bodyfat and use to better bmr * rate (cut or bulk)
            console.log('lastBodyMeasurements', lastBodyMeasurements)
            bf = this.calculateBodyFat(lastBodyMeasurements, userSettings);
            this.vitalsDataService.setBodyFat(bf / 100);
            console.log('bf', bf);

             // if latest body measurement is last overall measurement
            if (lastBodyMeasurements?.id === measurements[0].id) {
              // then use Katch-McArdle
              let lbm = weight * (100 - bf) / 100;// calculated in metric (kg)
              this.vitalsDataService.setLeanBodyMass(this.userSettings.unit === 'imperial' ? lbm * 2.20462262 : lbm);
              console.log('lbm', lbm);

              bmr = 370 + (21.6 * lbm);
              this.vitalsDataService.setBMR(bmr);
              this.maxCalories = bmr * 1.2 * (1 - rate / 100);
            }

          } else {
            // no last bodyfat calc
            this.vitalsDataService.setBodyFat(0.01);

            // use Mifflin-StJeor
            if (gender === 'male') {
              // For men:
              // BMR = 10W + 6.25H - 5A + 5
              bmr = 10 * weight + 6.25 * height - 5 * this.userAge(birthDate) + 5;
              this.vitalsDataService.setBMR(bmr);

              console.log(this.maxCalories);
              this.maxCalories = bmr * 1.2 * (1 - rate / 100);
            }

            // For women:
            // BMR = 10W + 6.25H - 5A - 161
          }

        }
      });
  }

  userAge(dob: Date): number {
    if (typeof dob === 'string') {
      dob = new Date(dob);
    }
    const monthDiff = Date.now() - dob.getTime();

    // convert the calculated difference in date format
    const ageDt = new Date(monthDiff);

    // extract year from date
    const year = ageDt.getUTCFullYear();

    // now calculate the age of the user
    return Math.abs(year - 1970);
  }

  calculateBodyFat(lastBodyMeasurements: Measurement, userSettings: UserSettings): number {
    let { neck, waist, hips } = lastBodyMeasurements as any;
    let { height } = userSettings;

    if(userSettings.unit === 'imperial'){
      neck *= 2.54;
      waist *= 2.54;
      hips *= 2.54;
      height *= 2.54;
    }

    let bf;
    if (userSettings.gender === 'male') {
      bf =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waist - neck) +
            0.15456 * Math.log10(height)) -
        450;
    } else {
      bf =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waist + hips - neck) +
            0.221 * Math.log10(height)) -
        450;
    }

    return bf;
  }

  measurementAdded(measurement: Measurement): void {
    this.measurementDataService.addMeasurement(measurement);
  }

  // on destroy
  ngOnDestroy(): void {
    this.unsubscribed$.next();
    this.unsubscribed$.complete();
  }
}
