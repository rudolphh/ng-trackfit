import { BehaviorSubject, Observable, of } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DailyProgressListComponent } from '../../food/daily-progress-list/daily-progress-list.component';
import { Food } from 'src/app/core/models/food.model';
import { HomeService } from '../home.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  @ViewChild(DailyProgressListComponent) dailyProgressList!: DailyProgressListComponent;

  selectedDate: Date = new Date();

  bodyFatSubject$ = new BehaviorSubject<number>(0.2143);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  maxCals = 1800;

  dbFoods$!: Observable<Food[]>;

  constructor(
    private homeService: HomeService
  ) {
    this.selectedDate.setHours(0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.dbFoods$ = this.homeService.dbFoods$;
    this.homeService.getFoodsByDate(this.selectedDate);
  }

  setSelected(date: Date): void {
    this.selectedDate = date;
    this.homeService.getFoodsByDate(date);
  }

  addFood(food: Food): void {
    const selectedDateTimeNow = new Date();
    selectedDateTimeNow.setFullYear(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate()
    );

    food.date = selectedDateTimeNow;
    this.homeService.addFood(food);
    this.dailyProgressList.update();
  }

}


