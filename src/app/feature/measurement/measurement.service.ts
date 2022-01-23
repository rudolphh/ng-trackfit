import {
  Measurement,
  MeasurementAdapter,
} from 'src/app/core/models/measurement';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ApiResponse } from 'src/app/core/models/api-response';
import { AuthService } from 'src/app/core/services/auth.service';
import { EnvService } from 'src/app/core/services/env.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MeasurementService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private env: EnvService,
    private measurementAdapter: MeasurementAdapter
  ) {}

  getAllMeasurements(): Observable<Measurement[]> {
    const user = this.authService.currentUserValue;
    const baseUrl = user
      ? `${this.env.apiUrl}/users/${user.id}/measurements`
      : '/api/measurements';

    return user
      ? this.http.get<ApiResponse>(baseUrl).pipe(
          map((response: ApiResponse) => {
            const data = response.data as Measurement[];
            return data.map((m: Measurement) =>
              this.measurementAdapter.adapt(m)
            );
          }),
          catchError((error) => of([]))
        )
      : (this.http.get(baseUrl) as Observable<Measurement[]>);
  }

  addMeasurement(measurement: Measurement): Observable<Measurement> {
    const user = this.authService.currentUserValue;
    const baseUrl = user
      ? `${this.env.apiUrl}/users/${user.id}/measurements`
      : '/api/measurements';

    return user
      ? this.http.post<ApiResponse>(baseUrl, measurement).pipe(
          map((response: ApiResponse) => {
            const data = response.data as Measurement;
            return this.measurementAdapter.adapt(data);
          }),
          catchError((error) => of({} as any))
        )
      : (this.http.post(baseUrl, measurement) as Observable<Measurement>);
  }
}
