import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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

  getAllMeasurements(): Promise<Measurement[]> {
    const user = this.authService.currentUserValue;
    const requestUrl = `${this.env.apiUrl}/users/${user.id}/measurements`;
    return <Promise<Measurement[]>> this.http.get<ApiResponse>(requestUrl).pipe(map((response : ApiResponse) => response.data))
    .toPromise();
  }
}
