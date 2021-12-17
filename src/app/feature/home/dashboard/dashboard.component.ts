import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Food, FoodAdapter } from 'src/app/core/models/food.model';
import { MatListOption, MatSelectionList } from '@angular/material/list';

import { BehaviorSubject } from 'rxjs';
import { HomeService } from '../home.service';
import { MeasurementService } from '../../measurement/measurement.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('calorieInput') calorieInput!: ElementRef;
  @ViewChild('foodsSelect') foodsSelect!: MatSelectionList;

  selected: Date | null = new Date();

  bodyFatSubject$ = new BehaviorSubject<number>(0.2143);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  dailyCal = this.homeService.dailyCalories;
  leftCal = this.homeService.leftCalories;

  dbFoods: Food[] = [];
  displayedFoods: Food[] = [];
  foodsLoaded = 3;
  selectAllFoods = false;

  allSelected = false;

  constructor(
    private homeService: HomeService,
    private measurementService: MeasurementService,
    private foodAdapter: FoodAdapter,
  ) {}

  ngOnInit(): void {
    // check to see if there there is data to update progress bar and calories left
    if (this.homeService.foodsDB.length) {
      this.leftCal = this.dailyCal - this.previousStoredCalories();
      this.homeService.leftCalories = this.leftCal;
      this.homeService.updateCaloriePercent();
    }
    // if no data initalize left calories = calories for the day
    else if (!this.homeService.foodsDB.length) {
      this.leftCal = this.dailyCal;
    }
  }

  // return percent string to update progress bar
  onUpdatePercent(): number {
    const value = this.homeService.caloriePercent;
    return parseInt(value.slice(0, -1), 10);
  }

  // check and see if there was stored data already
  previousStoredCalories(): number {
    let prevCal = 0;
    for (let i = 0; i <= this.homeService.foodsDB.length - 1; i++) {
      prevCal += this.homeService.foodsDB[i].calories;
    }
    return prevCal;
  }

  setSelected(date: Date): void {
    this.selected = date;
  }

  selectAllChange(): void {
    this.allSelected = !this.allSelected;
    this.foodsSelect.options.forEach(
      (item: MatListOption) => (item.selected = this.allSelected)
    );
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

  addFood(): void {
    const name = this.nameInput.nativeElement.value;
    const calories = this.calorieInput.nativeElement.value;

    this.dbFoods.unshift(this.foodAdapter.adapt({
      id: 10,
      name,
      calories,
      created: new Date()
    }));
    this.displayedFoods = this.dbFoods.slice(0, this.foodsLoaded);
  }

  loadMore(): void {
    if(this.dbFoods.length > this.foodsLoaded){
      this.foodsLoaded += 3;
      this.displayedFoods = this.dbFoods.slice(0, this.foodsLoaded);
    }
  }

  loadReset(): void {
    this.foodsLoaded = 3;
    this.displayedFoods = this.dbFoods.slice(0, this.foodsLoaded);
  }

}


