import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';
export class Measurement {
  constructor(
    public id: number,
    public weight: number,
    public unit: string,
    public date: Date,
    public neck?: number,
    public waist?: number,
    public hips?: number
  ) {}
}

@Injectable({ providedIn: 'root' })
export class MeasurementAdapter implements Adapter<Measurement> {
  adapt(measurement: any): Measurement {
    return new Measurement(
      measurement.id,
      +measurement.weight,
      measurement.unit,
      measurement.date,
      +measurement.neck,
      +measurement.waist,
      +measurement.hips
    );
  }
}
