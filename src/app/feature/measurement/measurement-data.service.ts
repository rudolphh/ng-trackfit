import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Measurement } from 'src/app/core/models/measurement';
import { MeasurementService } from './measurement.service';

@Injectable({ providedIn: 'root'})
export class MeasurementDataService {

  allMeasurementsDataSource !: BehaviorSubject<Measurement[]>;
  lastMeasurementDataSource !: BehaviorSubject<Measurement>;

  constructor(private measurementService: MeasurementService) {
    this.measurementService.getAllMeasurements().subscribe(data => {
      this.allMeasurementsDataSource.next(data);
      this.lastMeasurementDataSource.next(data[0]);
    })
  }

  get measurements(): Measurement[] {
    return this.allMeasurementsDataSource.getValue();
  }

  get lastMeasurement(): Measurement {
    return this.lastMeasurementDataSource.getValue();
  }

  get measurements$(): Observable<Measurement[]> {
    return this.allMeasurementsDataSource.asObservable();
  }

  get lastMeasurement$(): Observable<Measurement> {
    return this.lastMeasurementDataSource.asObservable();
  }

}
