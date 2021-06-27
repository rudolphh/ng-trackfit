import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/_models/foodInterface';
import { DashboardService } from '../dashboard.service' ; 

@Component({
  selector: 'app-calorie',
  templateUrl: './calorie.component.html',
  styleUrls: ['./calorie.component.css']
})
export class CalorieComponent implements OnInit {

  constructor( private dashService : DashboardService ) {
  }

  //initializing properties 
  latestBF = this.dashService.latestBodyFat;
  dailyCal = this.dashService.dailyCalories;
  leftCal = 0 ; 
  initDB: Food[] =[]; 

  ngOnInit(): void {
    // calling method for initialization  
    this.ongetFoodsInitially(); 
    // oberservable updating calories left 
    this.dashService.calorieChanged.subscribe( cal => {
      this.leftCal = cal;
    })

  }

  //------------- method to update calories left and progress bar on initialization ---------------//
  async ongetFoodsInitially(){

    //fetching data through GET request and store it in initDB array  
    await this.dashService.getFoods().then( res => {this.initDB = res;});
  
    //if there there is data then update progress bar and calories left 
    if( this.initDB.length ){
        this.leftCal = this.dailyCal - this.previousStoredCalories(); 
        this.dashService.leftCalories = this.leftCal; 
        this.dashService.updateCaloriePercent(); 
    }
    // if no data initalize left calories = daily calories  
    else if( !this.initDB.length ){
      this.leftCal=this.dailyCal; 
    }
  }

  //----------- check how many calories user has already taken for the day ----------------//
  previousStoredCalories(){
    let prevCal = 0; 
    for(let i=0 ; i<= this.initDB.length-1 ; i++){
      prevCal+=this.initDB[i].calories; 
    }
    return prevCal; 
  }

  //------ method to return percent string to update progress bar -------------//
  onUpdatePercent(){
    return this.dashService.caloriePercent; 
  }



}

