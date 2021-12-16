import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';

export class Food {
  constructor(
    public id: number,
    public name: string,
    public calories: number,
    public created: Date
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class FoodAdapter implements Adapter<Food> {
  adapt(food: any): Food {
    return new Food(food.id, food.name, food.calories, new Date(food.created));
  }
}
