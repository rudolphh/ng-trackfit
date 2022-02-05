import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserSettings, UserSettingsAdapter } from '../models/user-settings';
import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { ApiResponse } from '../models/api-response';
import { EnvService } from './env.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient,
    private env: EnvService,
    private userSettingsAdapter: UserSettingsAdapter
  ) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.env.apiUrl}/users`);
  }

  register(user: User): Observable<any> {
    const body = new HttpParams()
      .set('username', user.username || '')
      .set('email', user.email || '')
      .set('password', user.password || '')
      .set('passwordConfirm', user.passwordConfirm || '');

    return this.http.post<ApiResponse>(
      `${this.env.apiUrl}/register`,
      body.toString(),
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  } // end register

  settings(user: User): Observable<UserSettings> {
    return user ? this.http
      .get<ApiResponse>(`${this.env.apiUrl}/users/${user.id}/settings`)
      .pipe(
        map((response: ApiResponse) =>
          this.userSettingsAdapter.adapt(response.data as UserSettings)
        )
      ) : (this.http.get('/api/usersettings') as Observable<UserSettings[]>)
        .pipe(map((userSettingsArr: UserSettings[]) => userSettingsArr[0]));
  }

  updateSettings(user: User, settings: UserSettings): Observable<UserSettings> {
    return user ? this.http
      .patch<ApiResponse>(`${this.env.apiUrl}/users/${user.id}/settings`, settings)
      .pipe(
        map((response: ApiResponse) => this.userSettingsAdapter.adapt(response.data as UserSettings)),
        shareReplay()
      )
      : (this.http.post('/api/usersettings', settings) as Observable<UserSettings>).pipe(shareReplay())
  }
}
