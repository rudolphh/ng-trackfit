import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';

export class Food {
  constructor(
    public id: number,
    public name: string,
    public calories: number,
    public date: Date,
    public protein?: number,
    public carbohydrate?: number,
    public sugars?: number,
    public fat?: number,
    public saturated?: number,
    public unsaturated?: number,
    public trans?: number,
    public sodium?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

// if api changes, make changes here only
@Injectable({
  providedIn: 'root',
})
export class FoodAdapter implements Adapter<Food> {
  adapt(food: any): Food {
    return new Food(
      food._id,
      food.name,
      +food.calories,
      new Date(food.date),
      +food.protein || 0,
      +food.carbohydrate || 0,
      +food.sugars || 0,
      +food.fat || 0,
      +food.saturated || 0,
      +food.unsaturated || 0,
      +food.trans || 0,
      +food.sodium || 0,
      new Date(food.createdAt),
      new Date(food.updatedAt)
    );
  }
}
