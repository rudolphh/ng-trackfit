import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

import { FoodDataService } from '../../food/services/food-data.service';
import { HomeDataService } from '../home-data.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnDestroy {

  initialDate!: Date;

  bodyFatSubject$ = new BehaviorSubject<number>(0.2143);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  isLoading = false;

  subscription$ !: Subscription;

  constructor(
    private homeDataService: HomeDataService,
    private foodDataService: FoodDataService
  ) {
    // set initial date for entire dashboard
    this.homeDataService.setCurrentDate(new Date());

    this.subscription$ = this.homeDataService.currentDate.subscribe((date: Date) => {
      // every date change we need all other date related data changes to go here
      this.initialDate = date;
      this.isLoading = true;

      this.foodDataService.changeDate(date).subscribe(() => {
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
