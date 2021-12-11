import { Observable, of } from 'rxjs';

import { ApiResponse } from 'src/app/core/models/api-response';
import { AuthService } from 'src/app/core/services/auth.service';
import { EnvService } from 'src/app/core/services/env.service';
import { Food } from 'src/app/core/models/food.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FoodService {
  constructor(
    private authService: AuthService,
    private env: EnvService,
    private http: HttpClient
  ) {}

  list(): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods`;
    return this.http
      .get<ApiResponse>(baseUrl)
      .pipe(
        map((response: ApiResponse) => {
          const data = response.data as Food[];
          data.map((food: Food) =>
            new Food(food.id, food.name, food.calories, new Date(food.created))
          );
          return data;
        })
      );
  }
}
