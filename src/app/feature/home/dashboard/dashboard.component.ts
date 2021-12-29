import { BehaviorSubject, Observable, of } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DailyProgressListComponent } from '../../food/daily-progress-list/daily-progress-list.component';
import { Food } from 'src/app/core/models/food.model';
import { FoodDataService } from '../../food/food-data.service';
import { HomeDataService } from '../home-data.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  @ViewChild(DailyProgressListComponent) dailyProgressList!: DailyProgressListComponent;
  selectedDate!: Date;

  bodyFatSubject$ = new BehaviorSubject<number>(0.2143);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  maxCalories = 1800;

  isLoading = false;

  foods$!: Observable<Food[]>;

  constructor(
    private homeDataService: HomeDataService, private foodDataService: FoodDataService
  ) {
    this.selectedDate = this.homeDataService.date;
    this.selectedDate.setHours(0, 0, 0, 0);
    this.foodDataService.changeDate(this.selectedDate);
  }

  ngOnInit(): void {

  }

  setSelected(date: Date): void {
    this.isLoading = true;
    this.foodDataService.changeDate(date).subscribe(() => {
        this.isLoading = false;
    });
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


}


