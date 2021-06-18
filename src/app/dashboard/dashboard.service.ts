import { EventEmitter, Injectable } from '@angular/core';
import {mockFoods} from '../_models/mockFoods';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // data ("mock database")
  foodsDB = mockFoods;
  // initialized value
  latestBodyFat: number = 25 ;
  dailyCalories: number = 1800;
  leftCalories: number = 0;
  caloriePercent: string = "0%";

  constructor() { }

  statusInput = new EventEmitter <string>();

  // update the percent to update the progress bar
  updateCaloriePercent(){
    let rawPercentage = (this.dailyCalories-this.leftCalories)/this.dailyCalories*100;
    rawPercentage = Math.min(rawPercentage, 100);
    this.caloriePercent = rawPercentage + '%';
  }

}
