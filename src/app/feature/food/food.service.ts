import { Food, FoodAdapter } from 'src/app/core/models/food.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResponse } from 'src/app/core/models/api-response';
import { AuthService } from 'src/app/core/services/auth.service';
import { EnvService } from 'src/app/core/services/env.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { map } from 'rxjs/operators';

@Injectable()
export class FoodService {
  constructor(
    private authService: AuthService,
    private env: EnvService,
    private http: HttpClient, private foodAdapter: FoodAdapter
  ) {}

  get list(): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods`;

    return this.http
      .get<ApiResponse>(baseUrl)
      .pipe(
        map((response: ApiResponse) => {
          const data = response.data as Food[];
          return data.map((food: Food) => this.foodAdapter.adapt(food));
        })
      );
  }

  getFoodsByDate(start: string, end: string): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods?start=${start}&end=${end}`;

    return this.http
      .get<ApiResponse>(baseUrl)
      .pipe(
        map((response: ApiResponse) => {
          const data = response.data as Food[];
          return data.map((food: Food) => this.foodAdapter.adapt(food));
        })
      );
  }

  getFoodsByName(name: string): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods?name=${name}`;

    console.log('get foods by name called')
    return this.http
      .get<ApiResponse>(baseUrl)
      .pipe(
        map((response: ApiResponse) => {
          const data = response.data as Food[];
          return data.map((food: Food) => this.foodAdapter.adapt(food));
        })
      );
  }

  addFood(food: Food): Observable<Food> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods`;

    return this.http.post<ApiResponse>(baseUrl, food)
      .pipe(
        map((response: ApiResponse) => {
          const data = response.data as Food;
          return this.foodAdapter.adapt(data);
        })
      );
  }

  deleteFoods(foods: string[]): Observable<ApiResponse> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods`;

    const httpOptions = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json'
      }),
      body: {foods}
   };
    return this.http.delete<ApiResponse>(baseUrl, httpOptions);
  }

  updateFood(food: Food): Observable<Food> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods/${food.id}`;

    return this.http.patch<ApiResponse>(baseUrl, food).pipe(
      map((response: ApiResponse) => {
        const data = response.data as Food;
        return this.foodAdapter.adapt(data);
      })
    );
  }
}
