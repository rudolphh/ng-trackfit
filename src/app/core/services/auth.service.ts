import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User, UserAdapter } from '../models/user';
import { catchError, map } from 'rxjs/operators';

import { ApiResponse } from '../models/api-response';
import { EnvService } from './env.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private env: EnvService,
    private userAdapter: UserAdapter
    ) {

    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  login(username: string, password: string): Observable<ApiResponse> {
    const body = new HttpParams()
      .set('username', username)
      .set('email', username)
      .set('password', password);

    return this.http
      .post<ApiResponse>(`${this.env.apiUrl}/login`, body)
      .pipe(
        map((response) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (response.data) {
            const data: User = response.data as User;
            data.token = response.token;
            data.expiresIn = response.expiresIn;

            const userReturned = this.userAdapter.adapt(data);
            localStorage.setItem('currentUser', JSON.stringify(userReturned));
            this.currentUserSubject.next(userReturned);
          }
          return response;
        }),
        catchError((error) => {
          return of({ success: false, message: error });
        })
      );
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.currentUserValue?.token;
    // Check whether the token is expired and return true or false
    return !helper.isTokenExpired(token);
  }
}
