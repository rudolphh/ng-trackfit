import { Component, Input, OnInit } from '@angular/core';

import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from 'src/app/feature/food/services/food-data.service';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-daily-macros',
  templateUrl: './daily-macros.component.html',
})
export class DailyMacrosComponent implements OnInit {
  @Input() selectedDate!: Date;
  @Input() isLoading = false;

  currentMacros = { protein: 0, carbohydrate: 0, fat: 0 };
  macrosPercent = {};
  protein = 0;
  carbohydrate = 0;
  fat = 0;
  max = { protein: 212, carbohydrate: 222, fat: 50 };

  constructor(private foodDataService: FoodDataService) {
    this.foodDataService.todaysFood$.subscribe((foods: Food[]) => {
      console.log('currentMacros');
      this.currentMacros = foods.reduce(
        (prev, curr) => {
          prev.protein += curr.protein || 0;
          prev.carbohydrate += curr.carbohydrate || 0;
          prev.fat += curr.fat || 0;

          return prev;
        },
        { protein: 0, carbohydrate: 0, fat: 0 }
      );
    });
  }

  ngOnInit(): void {}

  get currentMacroPercent(): any {
    const currentMacroPercent = {};
    for ( const macro in this.currentMacros ) {
      if (macro){
        currentMacroPercent[macro] = this.currentMacros[macro] / this.max[macro] * 100;
      }
    }
    return currentMacroPercent;
  }
}
