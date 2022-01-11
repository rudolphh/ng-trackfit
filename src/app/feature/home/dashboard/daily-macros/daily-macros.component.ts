import { Component, Input, OnInit } from '@angular/core';

import { FoodDataService } from 'src/app/feature/food/services/food-data.service';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-daily-macros',
  templateUrl: './daily-macros.component.html',
})
export class DailyMacrosComponent implements OnInit {
  @Input() selectedDate!: Date;
  @Input() isLoading = false;

  macrosPercent = { protein: 0, carbohydrate: 0, fat: 0 };
  protein = 0;
  carbohydrate = 0;
  fat = 0;
  max = { protein: 212, carbohydrate: 222, fat: 50 };

  constructor(private foodDataService: FoodDataService) {}

  ngOnInit(): void {
  }

  get currentMacros(): any {
    return this.foodDataService.foods.reduce(
      (prev, curr) => {
        prev.protein += curr.protein;
        prev.carbohydrate += curr.carbohydrate;
        prev.fat += curr.fat;

        return prev;
      },
      { protein: 0, carbohydrate: 0, fat: 0 }
    );
  }

  get currentMacroPercent(): any {
    let currentMacroPercent = {}
    for( let macro in this.currentMacros ) {
      currentMacroPercent[macro] = this.currentMacros[macro] / this.max[macro] * 100;
    }
    return currentMacroPercent;
  }
}
