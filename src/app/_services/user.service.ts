import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvService } from './env.service';
import { User } from '../_models/user';
import { ApiResponse } from '../_models/api-response';
import { map } from 'rxjs/operators';
import { Settings } from '../_models/settings';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private env: EnvService) {}

  getAll() {
    return this.http.get<any[]>(`${this.env.apiUrl}/users`);
  }

  register(user: User) {
    const body = new HttpParams()
      .set('username', user.username!)
      .set('email', user.email!)
      .set('password', user.password!)
      .set('passwordConfirm', user.passwordConfirm!);

      return this.http.post(`${this.env.apiUrl}/register`,
        body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      );
  }// end register

  settings(user : User) {
    return this.http.get<any>(`${this.env.apiUrl}/users/${user.id}/settings`).toPromise();
  }
}
