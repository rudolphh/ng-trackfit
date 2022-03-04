import { Component, Input, OnInit } from '@angular/core';

import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from 'src/app/feature/food/services/food-data.service';
import { HomeDataService } from '../../home-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily-progress',
  templateUrl: './daily-progress.component.html',
  styleUrls: ['./daily-progress.component.css'],
})
export class DailyProgressComponent implements OnInit {
  @Input() maxCalories = 1800;
  @Input() foods$!: Observable<Food[]>;
  @Input() selectedDate!: Date;
  @Input() isLoading = false;

  @Input() inDemo = true;
  currentCals = 0;

  constructor(
    private homeDataService: HomeDataService,
    private foodDataService: FoodDataService
  ) {}

  ngOnInit(): void {
    this.foods$.subscribe(foods => {
      this.currentCals = foods.reduce((prev, curr) => {
        return prev + curr.calories;
      }, 0);
    })
  }

  setSelected(date: Date): void {
    this.foodDataService.changeDate(date);
  }

  addFood(food: Food): void {
    // new date will get current time
    const selectedDateTimeNow = new Date();
    // which we will keep and change to the selected date
    selectedDateTimeNow.setFullYear(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate()
    );

    food.date = selectedDateTimeNow;
    this.foodDataService.addFood(food);
  }

  get remainingCalories(): number {
    return this.maxCalories - this.currentCals;
  }

  get percentOfDaily(): number {
    return (this.currentCals / this.maxCalories) * 100;
  }

  // for remaining
  remainingColor(): string {
    return this.percentOfDaily < 50
      ? 'light-text-success'
      : this.percentOfDaily < 75
      ? 'light-text-primary'
      : this.percentOfDaily < 100
      ? 'light-text-warning'
      : 'light-text-danger';
  }
}
