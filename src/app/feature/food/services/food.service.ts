import { Food, FoodAdapter } from 'src/app/core/models/food.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, share, shareReplay, tap } from 'rxjs/operators';

import { ApiResponse } from 'src/app/core/models/api-response';
import { AuthService } from 'src/app/core/services/auth.service';
import { EnvService } from 'src/app/core/services/env.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Injectable()
export class FoodService {
  constructor(
    private authService: AuthService,
    private env: EnvService,
    private http: HttpClient,
    private foodAdapter: FoodAdapter
  ) {}

  get list(): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods`;

    return this.http.get<ApiResponse>(baseUrl).pipe(
      map((response: ApiResponse) => {
        const data = response.data as Food[];
        return data.map((food: Food) => this.foodAdapter.adapt(food));
      })
    );
  }

  getFoodsByDate(start: string, end: string): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = user
      ? `${this.env.apiUrl}/users/${user.id}/foods?start=${start}&end=${end}`
      : '/api/foods';

    return user
      ? this.http.get<ApiResponse>(baseUrl).pipe(
          map((response: ApiResponse) => {
            const data = response.data as Food[];
            return data.map((food: Food) => this.foodAdapter.adapt(food));
          }),
          shareReplay() // for multiple view layer subscriptions
        )
      : (this.http
          .get(baseUrl)
          .pipe(
            map((foods: any) =>
              foods.map((food: Food) => food)
            ), shareReplay()
          ) as Observable<Food[]>);
  }

  getFoodsByName(name: string): Observable<Food[]> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = user
      ? `${this.env.apiUrl}/users/${user.id}/foods?name=${name}`
      : '/api/foods';

    return user
      ? this.http.get<ApiResponse>(baseUrl).pipe(
          map((response: ApiResponse) => {
            const data = response.data as Food[];
            return data.map((food: Food) => this.foodAdapter.adapt(food));
          })
        )
      : this.http
          .get(baseUrl)
          .pipe(
            map((response: any) =>
              response.filter((item: Food) => item.name.startsWith(name))
            )
          );
  }

  addFood(food: Food): Observable<Food> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = user
      ? `${this.env.apiUrl}/users/${user.id}/foods`
      : '/api/foods';

    return user
      ? this.http.post<ApiResponse>(baseUrl, food).pipe(
          map((response: ApiResponse) => {
            const data = response.data as Food;
            return this.foodAdapter.adapt(data);
          })
        )
      : (this.http.post(baseUrl, food) as Observable<Food>);
  }

  deleteFoods(foods: string[]): Observable<ApiResponse> {
    const user: User = this.authService.currentUserValue;
    const baseUrl = `${this.env.apiUrl}/users/${user.id}/foods`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { foods },
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
