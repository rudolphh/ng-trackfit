import { EventEmitter, Injectable } from '@angular/core';

import {mockFoods} from '../../core/_models/mockFoods';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // data ("mock database")
  foodsDB = mockFoods;
  // initialized value
  latestBodyFat = 25 ;
  dailyCalories = 1800;
  leftCalories = 0;
  caloriePercent = '0%';

  constructor() { }

  statusInput = new EventEmitter <string>();

  // update the percent to update the progress bar
  updateCaloriePercent(): void{
    let rawPercentage = (this.dailyCalories - this.leftCalories) / this.dailyCalories * 100;
    rawPercentage = Math.min(rawPercentage, 100);
    this.caloriePercent = rawPercentage + '%';
  }

}
