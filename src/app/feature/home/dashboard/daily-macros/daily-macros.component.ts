import { Component, Input, OnInit } from '@angular/core';

import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from 'src/app/feature/food/services/food-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily-macros',
  templateUrl: './daily-macros.component.html',
})
export class DailyMacrosComponent implements OnInit {

  @Input() foods$ !: Observable<Food[]>;

  protein = 0;
  carbohydrate = 0;
  fat = 0;
  max = { protein: 212, carbohydrate: 222, fat: 50 };

  constructor(private foodDataService: FoodDataService) {}

  ngOnInit(): void {
    this.foods$.subscribe((foods) => {
      this.protein = 0;
      this.carbohydrate = 0;
      this.fat = 0;

      foods.forEach(
        (food: Food) => {
          this.protein += food.protein || 0;
          this.carbohydrate += food.carbohydrate || 0;
          this.fat += food.fat || 0;
      });
    });
  }

  get proteinPercent(): number {
    return this.protein / this.max.protein * 100;
  }

  get carbohydratePercent(): number {
    return this.carbohydrate / this.max.carbohydrate * 100;
  }

  get fatPercent(): number {
    return this.fat / this.max.fat * 100;
  }

}
