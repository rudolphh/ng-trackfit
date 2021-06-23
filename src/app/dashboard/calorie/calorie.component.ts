import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service' ; 

@Component({
  selector: 'app-calorie',
  templateUrl: './calorie.component.html',
  styleUrls: ['./calorie.component.css']
})
export class CalorieComponent implements OnInit {

  constructor( private dashService : DashboardService ) {
  }

  latestBF = this.dashService.latestBodyFat;
  dailyCal = this.dashService.dailyCalories;
  leftCal = 0 ; 

  ngOnInit(): void {

    this.dashService.calorieChanged.subscribe( cal => {
      this.leftCal = cal;
      console.log(this.leftCal);
    })

    // check to see if there there is data to update progress bar and calories left 
    if( this.dashService.foodsDB.length ){
        this.leftCal = this.dailyCal - this.previousStoredCalories(); 
        this.dashService.leftCalories = this.leftCal; 
        this.dashService.updateCaloriePercent(); 
    }
    // if no data initalize left calories = calories for the day 
    else if( !this.dashService.foodsDB.length ){
      this.leftCal=this.dailyCal; 
    }
  }

  // return percent string to update progress bar
  onUpdatePercent(){
    return this.dashService.caloriePercent; 
  }

  // check and see if there was stored data already
  previousStoredCalories(){
    let prevCal = 0; 
    for(let i=0 ; i<= this.dashService.foodsDB.length-1 ; i++){
      prevCal+=this.dashService.foodsDB[i].calories; 
    }
    return prevCal; 
  }
 

}

