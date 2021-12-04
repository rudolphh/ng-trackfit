import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { Measurement } from 'src/app/core/_models/measurement';
import { MeasurementService } from 'src/app/feature/measurement/measurement.service';
import { User } from 'src/app/core/models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit, OnDestroy {

  user !: User;
  isFemale = false;
  loading = true;
  measurements !: Measurement [];

  measurements$ !: Observable<Measurement[]>;

  weightUnit !: string;
  lengthUnit !: string;

  sub !: Subscription;

  constructor(
    private authService: AuthService,
    private measurementService: MeasurementService
    ) { }

  ngOnInit(): void {

    this.user = this.authService.currentUserValue;
    this.isFemale = this.user.settings?.gender === 'female';

    this.weightUnit = this.user.settings?.unit === 'imperial' ? 'lbs.' : 'kg';
    this.lengthUnit = this.user.settings?.unit === 'imperial' ? 'in.' : 'cm';

    this.measurements$ = this.measurementService.getAllMeasurements();

    this.sub = this.measurements$.pipe(take(1)).subscribe((measurements) => {
      this.measurements = measurements;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}


