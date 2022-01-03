import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { FoodDataService } from '../../food/food-data.service';
import { HomeDataService } from '../home-data.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  initialDate!: Date;

  bodyFatSubject$ = new BehaviorSubject<number>(0.2143);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  isLoading = false;

  constructor(
    private homeDataService: HomeDataService,
    private foodDataService: FoodDataService
  ) {
    // set initial date for entire dashboard
    this.homeDataService.setCurrentDate(new Date());

    this.homeDataService.currentDate.subscribe((date: Date) => {
      // every date change we need all other date related data changes to go here
      this.initialDate = date;
      this.isLoading = true;

      console.log(date)
      this.foodDataService.changeDate(date).subscribe(() => {
        this.isLoading = false;
      });
    });
  }

}
