import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Food } from '../../_models/foodInterface';

@Component({
  selector: 'app-calorie-intake',
  templateUrl: './calorie-intake.component.html',
  styleUrls: ['./calorie-intake.component.css']
})
export class CalorieIntakeComponent implements OnInit {

  addedFood ?: Food;
  dbFoods: Food[] = [];

  constructor( private dashService : DashboardService ) { }

  // on initialization go to set up food intake table 
  ngOnInit(): void {
      this.onupdateTable(); 
  }

  //-------------------- getting data and storing objects in dbfoods array ----------------------//
  async onupdateTable(){
    // fetching data through GET request and store it in dbfoods array 
    await this.dashService.getFoods().then( res => {this.dbFoods = res;}); 
  }

  //---------------- ADDing Calories both to Mongo and our local food object array ---------------//
  async onAddCalories(calorieInput: HTMLInputElement, nameInput: HTMLInputElement){

    const nameFood = nameInput.value; 
    const caloriesFood = parseInt(calorieInput.value,10); 
    let newFoodObj = {name: nameFood, calories: caloriesFood};

    if ( caloriesFood && nameFood ){
      // update properties in service (calories left and Percent for progress bar)
      let updatedCalories =  this.dashService.leftCalories-caloriesFood;  
      this.dashService.updateCaloriesLeft(updatedCalories);   
      this.dashService.updateCaloriePercent(); 
      // adding new foods object to mongo and updating table 
      await this.dashService.addFoods(newFoodObj);
      this.onupdateTable(); 
    }

    // if no data was entered for either food or calories 
    else {
      this.dashService.statusInput.emit('Missing calories or name of food.');
    }
 }

 //----------------- DELETing Calories both to Mongo and our local food object array -----------------//
  async onDeleteFood(delFood: Food){
    // update properties in service (calories left and Percent for progress bar)
    let newCal = this.dashService.leftCalories + delFood.calories; 
    this.dashService.updateCaloriesLeft(newCal);
    this.dashService.updateCaloriePercent();
    // delete food object from from mongodb and update table 
    for (let i =0; i <= this.dbFoods.length-1 ; i++){
      if( delFood._id == this.dbFoods[i]._id){
        await this.dashService.deleteFoods(delFood._id); 
        this.onupdateTable();
      }
    }
    
  }


   
}