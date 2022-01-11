import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';
export class Measurement {
  constructor(
    public id: number,
    public weight: number,
    public neck: number,
    public waist: number,
    public hips: number,
    public unit: string,
    public date: Date
  ) {}
}

@Injectable({ providedIn: 'root' })
export class MeasurementAdapter implements Adapter<Measurement> {
  adapt(measurement: any): Measurement {
    return new Measurement(
      measurement.id,
      measurement.weight,
      measurement.neck,
      measurement.waist,
      measurement.hips,
      measurement.unit,
      measurement.date
    );
  }
}
