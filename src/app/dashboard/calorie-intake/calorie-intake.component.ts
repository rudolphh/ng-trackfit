import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { FoodInfo } from '../../_models/food.model';
import { Food } from '../../_models/foodInterface';

@Component({
  selector: 'app-calorie-intake',
  templateUrl: './calorie-intake.component.html',
  styleUrls: ['./calorie-intake.component.css']
})
export class CalorieIntakeComponent implements OnInit {

  addedFood ?: Food;
  dbFoods = this.dashService.foodsDB;

  constructor( private dashService : DashboardService ) { }

  ngOnInit(): void {}

  onAddCalories(calorieInput: HTMLInputElement, nameInput: HTMLInputElement){
    const nameFood = nameInput.value; 
    const caloriesTaken = parseInt(calorieInput.value,10); 
    // input had to have both name and calories 
    if ( caloriesTaken && nameFood ){

      let updatedCalories =  this.dashService.leftCalories-caloriesTaken;  
      this.dashService.updateCaloriesLeft(updatedCalories);   
      this.dashService.updateCaloriePercent(); 
     

      let idFood = this.dashService.foodsDB.length + 1; 

      const newFood = new FoodInfo(idFood,nameFood, caloriesTaken);
      this.dashService.foodsDB.push(newFood);
    }
    else {
      console.log('Missing calories or name of food.');
      this.dashService.statusInput.emit('Missing calories or name of food.');
    }
 }

 onDeleteFood(delFood: Food): void{
  let newCal = this.dashService.leftCalories + delFood.calories; 
  this.dashService.updateCaloriesLeft(newCal);
  this.dashService.updateCaloriePercent();
  for (let i =0; i <= this.dashService.foodsDB.length-1 ; i++){
    if( delFood.id == this.dashService.foodsDB[i].id){
      this.dashService.foodsDB.splice(i,1)
    }
  }
}
   
}