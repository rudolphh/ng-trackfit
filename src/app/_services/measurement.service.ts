import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiResponse } from '../_models/api-response';
import { Measurement } from '../_models/measurement';
import { AuthService } from './auth.service';
import { EnvService } from './env.service';

@Injectable({ providedIn: 'root'})
export class MeasurementService {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private env: EnvService
    ) { }

  getAllMeasurements(): Observable<any> {
    const user = this.authService.currentUserValue;
    const requestUrl = `${this.env.apiUrl}/users/${user.id}/measurements`;

    return this.http.get<any>(requestUrl)
                    .pipe(
                      map((response) => response.data),
                      catchError((error) => of([])))
  }
}
