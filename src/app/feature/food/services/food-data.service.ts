import { BehaviorSubject, Observable, of } from 'rxjs';

import { ApiResponse } from 'src/app/core/models/api-response';
import { Food } from 'src/app/core/models/food.model';
import { FoodService } from './food.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FoodDataService {

  private todaysFoodDataSource: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);
  private autocompleteFoodDataSource: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);

  constructor(private foodService: FoodService) {}

  get foods(): Food[] {
    return this.todaysFoodDataSource.getValue();
  }

  get todaysFood$(): Observable<Food[]> {
    return this.todaysFoodDataSource.asObservable();
  }

  get autocompleteOptions$(): Observable<Food[]> {
    return this.autocompleteFoodDataSource.asObservable();

  }

  changeDate(date: Date): Observable<Food[]> {
    const todayString = date.toISOString();

    const tomorrow = new Date(date.getTime());
    tomorrow.setDate(date.getDate() + 1);
    const tmwString = tomorrow.toISOString();

    let obs = this.foodService.getFoodsByDate(todayString, tmwString);

    obs.subscribe(foods => {
      this.todaysFoodDataSource.next(foods);
    });

    return obs;
  }


  updateAutocompleteOptions(name: string): Observable<Food[]> {
    if (!name || name === '') {
      this.autocompleteFoodDataSource.next([]);
      return of([]);
    }

    let obs = this.foodService.getFoodsByName(name);

    // remove duplicate name - same calories
    obs.pipe(
      map((foods: Food[]) => {
        const seen = {};
        return foods.filter((item) =>
          seen.hasOwnProperty(item.calories)
            ? false
            : (seen[item.calories] = true)
        );
      })
    ).subscribe(foods => {
      this.autocompleteFoodDataSource.next(foods);
    });

    return obs;
  }

  addFood(food: Food): Observable<Food> {
    let obs = this.foodService.addFood(food);

    obs.subscribe(savedFood => {
      const foods = [savedFood, ...this.todaysFoodDataSource.getValue()];
      this.todaysFoodDataSource.next(foods);
    });

    return obs;
  }

  saveFood(food: Food): Observable<Food> {
    let obs = this.foodService.updateFood(food);

    obs.subscribe(savedFood => {
      const index = this.foods.findIndex(item => item.id === food.id);
      this.foods[index] = savedFood;
    });

    return obs;
  }

  deleteFoods(foodIds: string[], remainingFoods: Food[]): Observable<ApiResponse> {
    let obs = this.foodService.deleteFoods(foodIds);

    obs.subscribe(response => {
      if (response.success) {
        this.todaysFoodDataSource.next(remainingFoods);
      }
    });

    return obs;
  }



}
