import { BehaviorSubject, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Measurement } from 'src/app/core/models/measurement';
import { MeasurementService } from './measurement.service';

@Injectable({ providedIn: 'root'})
export class MeasurementDataService {

  private allMeasurementsDataSource = new BehaviorSubject<Measurement[]>([]);

  constructor(private measurementService: MeasurementService) {
    this.measurementService.getAllMeasurements().subscribe(data => {
      this.allMeasurementsDataSource.next(data);
    });
  }

  getAllMeasurements(): Observable<Measurement[]> {
    let obs = this.measurementService.getAllMeasurements()

    obs.subscribe(data => {
      this.allMeasurementsDataSource.next(data);
    });

    return obs;
  }

  get measurements(): Measurement[] {
    return this.allMeasurementsDataSource.getValue();
  }

  get measurements$(): Observable<Measurement[]> {
    return this.allMeasurementsDataSource.asObservable();
  }

}
