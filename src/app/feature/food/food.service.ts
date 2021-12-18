import { Food, FoodAdapter } from 'src/app/core/models/food.model';
import { Observable, of } from 'rxjs';

import { ApiResponse } from 'src/app/core/models/api-response';
import { AuthService } from 'src/app/core/services/auth.service';
import { EnvService } from 'src/app/core/services/env.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { map } from 'rxjs/operators';

//@Injectable({ providedIn: 'root' })
export class FoodService {
  constructor(
    private authService: AuthService,
    private env: EnvService,
    private http: HttpClient, private foodAdapter: FoodAdapter
  ) {}

  list(): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods`;

    return this.http
      .get<ApiResponse>(baseUrl)
      .pipe(
        map((response: ApiResponse) => {
          const data = response.data as Food[];
          data.map((food: Food) => this.foodAdapter.adapt(food));
          return data;
        })
      );
  }
}
