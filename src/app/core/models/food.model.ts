import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';

export class Food {
  constructor(
    public id: number,
    public name: string,
    public calories: number,
    public date: Date,
    public protein: number,
    public carbohydrate: number,
    public sugars: number,
    public fat: number,
    public saturated: number,
    public unsaturated: number,
    public trans: number,
    public sodium: number,
    public createdAt: Date,
    public updatedAt: Date
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
      +food.protein,
      +food.carbohydrate,
      +food.sugars,
      +food.fat,
      +food.saturated,
      +food.unsaturated,
      +food.trans,
      +food.sodium,
      new Date(food.createdAt),
      new Date(food.updatedAt)
    );
  }
}
