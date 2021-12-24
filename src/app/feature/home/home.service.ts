import { BehaviorSubject, Observable } from 'rxjs';

import { Food } from 'src/app/core/models/food.model';
import { FoodService } from '../food/food.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private foodDataSource$: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>(
    []
  );

  public readonly foodData$: Observable<Food[]> = this.foodDataSource$.asObservable();

  constructor(private foodService: FoodService) {}

  /// methods

  get dbFoods$(): Observable<Food[]> {
    return this.foodData$;
  }
  setFoods(foods: Food[]): void {
    this.foodDataSource$.next(foods);
  }

  getFoodsByDate(date: Date): void {
    const todayString = date.toISOString();

    const tomorrow = new Date(date.getTime());
    tomorrow.setDate(date.getDate() + 1);
    const tmwString = tomorrow.toISOString();

    // not typical to subscribe in service
    this.foodService
      .getFoodsByDate(todayString, tmwString)
      .pipe(take(1)).subscribe((foods: Food[]) => {
        this.foodDataSource$.next(foods);
      });
  }

  addFood(food: Food): void {

    this.foodService.addFood(food)
      .pipe(take(1)).subscribe((newFood: Food) => {
        const foods = this.foodDataSource$.getValue();
        const updatedFoods = [newFood, ...foods];
        this.foodDataSource$.next(updatedFoods);
      });
  }

}
