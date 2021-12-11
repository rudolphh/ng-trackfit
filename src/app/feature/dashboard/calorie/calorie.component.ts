import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';

import { DashboardService } from '../dashboard.service';
import { Food } from 'src/app/core/_models/foodInterface';
import { MeasurementService } from '../../measurement/measurement.service';

declare var $: any;
@Component({
  selector: 'app-calorie',
  templateUrl: './calorie.component.html',
  styleUrls: ['./calorie.component.css']
})
export class CalorieComponent implements OnInit {

  @ViewChild('foodsSelect') foodsSelect !: MatSelectionList;

  selected: Date | null = new Date();

  latestBF = this.dashService.latestBodyFat;
  dailyCal = this.dashService.dailyCalories;
  leftCal = this.dashService.leftCalories;

  dbFoods = this.dashService.foodsDB;
  selectAllFoods = false;

  allSelected = false;

  constructor(
    private dashService: DashboardService,
    private measurementService: MeasurementService
  ) {}

  ngOnInit(): void {

    // check to see if there there is data to update progress bar and calories left
    if ( this.dashService.foodsDB.length ){
        this.leftCal = this.dailyCal - this.previousStoredCalories();
        this.dashService.leftCalories = this.leftCal;
        this.dashService.updateCaloriePercent();
    }
    // if no data initalize left calories = calories for the day
    else if ( !this.dashService.foodsDB.length ){
      this.leftCal = this.dailyCal;
    }

    this.dbFoods.forEach((food) => food.checked = false);
  }

  // return percent string to update progress bar
  onUpdatePercent(): number{
    const value = this.dashService.caloriePercent;
    return parseInt(value.slice(0, -1), 10);
  }

  // check and see if there was stored data already
  previousStoredCalories(): number{
    let prevCal = 0;
    for (let i = 0 ; i <= this.dashService.foodsDB.length - 1 ; i++){
      prevCal += this.dashService.foodsDB[i].calories;
    }
    return prevCal;
  }

  setSelected(date: Date): void {
    this.selected = date;
  }

  selectAllChange(): void {
      this.foodsSelect.options.forEach((item: MatListOption) => console.log(item.toggle()));
      this.allSelected = !this.allSelected;
  }

  public trackFood (index: number, food: Food) {
    return food.checked;
  }

  optionClick(): void {

    let newStatus = true;
    this.foodsSelect.options.forEach((item: MatListOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }


}
