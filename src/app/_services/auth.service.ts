import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvService } from './env.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiResponse } from '../_models/api-response';
import { User } from '../_models/user';

const helper = new JwtHelperService();


@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private env: EnvService
    ) {

    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username :string, password: string) : Observable<ApiResponse> {
    const body = new HttpParams()
      .set('username', username)
      .set('email', username)
      .set('password', password);

    return this.http
      .post<ApiResponse>(`${this.env.apiUrl}/login`, body)
      .pipe(
        map((response) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if(response.data) {
            let userReturned : User = <User> response.data;
            userReturned.token = response.token;
            userReturned.expiresIn = response.expiresIn;

            localStorage.setItem('currentUser', JSON.stringify(userReturned));
            this.currentUserSubject.next(userReturned);
          }
          return response;
        })
      );
  }



  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated() {
    const token = this.currentUserValue?.token;
    // Check whether the token is expired and return true or false
    return !helper.isTokenExpired(token);
  }
}
