import { Component, OnInit } from '@angular/core';
import { Food, FoodAdapter } from 'src/app/core/models/food.model';

import { DashboardService } from '../dashboard.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-calorie-intake',
  templateUrl: './calorie-intake.component.html',
  styleUrls: ['./calorie-intake.component.css'],
})
export class CalorieIntakeComponent implements OnInit {
  addedFood?: Food;
  dbFoods = this.dashService.foodsDB;
  sortedData!: Food[];

  constructor(
    private dashService: DashboardService,
    private foodAdapter: FoodAdapter
  ) {}

  ngOnInit(): void {
    this.sortedData = this.dbFoods.slice();
  }

  onAddCalories(calorieInput: HTMLInputElement, nameInput: HTMLInputElement) {
    const nameFood = nameInput.value;
    const caloriesTaken = parseInt(calorieInput.value, 10);
    // input had to have both name and calories
    if (caloriesTaken && nameFood) {
      console.log(nameFood);
      console.log(caloriesTaken);
      this.dashService.leftCalories =
        this.dashService.leftCalories - caloriesTaken;
      let idFood = this.dashService.foodsDB.length + 1;

      const newFood = this.foodAdapter.adapt({
        id: idFood,
        name: nameFood,
        calories: caloriesTaken,
        created: JSON.stringify(new Date()),
      });
      this.dashService.foodsDB.push(newFood);

      this.dashService.updateCaloriePercent();
    } else {
      console.log('Missing calories or name of food.');
    }
  }

  onDeleteFood(delFood: Food): void {
    this.dashService.leftCalories =
      this.dashService.leftCalories + delFood.calories;
    this.dashService.updateCaloriePercent();
    for (let i = 0; i <= this.dashService.foodsDB.length - 1; i++) {
      if (delFood.id == this.dashService.foodsDB[i].id) {
        this.dashService.foodsDB.splice(i, 1);
      }
    } // for loop
  }

  sortData(sort: Sort) {
    const data = this.dbFoods.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'calories':
          return compare(a.calories, b.calories, isAsc);
        // case 'fat':
        //   return compare(a.fat, b.fat, isAsc);
        // case 'carbs':
        //   return compare(a.carbs, b.carbs, isAsc);
        // case 'protein':
        //   return compare(a.protein, b.protein, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
