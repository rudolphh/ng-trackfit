import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Food } from 'src/app/core/models/food.model';
import { FoodService } from './food.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FoodDataService {

  private todaysFoodDataSource: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);
  private autocompleteFoodDataSource: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);

  constructor(private foodService: FoodService) {}

  get todaysFood(): Observable<Food[]> {
    return this.todaysFoodDataSource.asObservable();
  }

  get autocompleteOptions(): Observable<Food[]> {
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

}
