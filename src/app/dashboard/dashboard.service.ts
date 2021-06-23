import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import {mockFoods} from '../_models/mockFoods';
import {Food} from '../_models/foodInterface';

import { API_URL } from '../../environments/environment'; 
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';
// connect once api is set for foods 
//import { EnvService } from '../_services/env.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // data ("mock database")
  foodsDB: Food[] = [] ; 
  // initialized value 
  latestBodyFat: number = 25 ; 
  dailyCalories: number = 1800; 
  leftCalories: number = 0; 
  caloriePercent: string = "0%"; 

  constructor(private http: HttpClient) { }

  statusInput = new EventEmitter <string>(); 

  private calorieSubject = new BehaviorSubject<number>(0); 
  calorieChanged = this.calorieSubject.asObservable(); 

  getFoods(){
    let foodsss = this.http.get<any[]>(`${API_URL}/foods`); 
    return foodsss; 
  }

  updateCaloriesLeft(cal: number){
    this.leftCalories = cal; 
    this.calorieSubject.next(this.leftCalories); 
    console.log('Left calories ()'+this.leftCalories);
  }

  // update the perecent to update the progress bar
  updateCaloriePercent(){
    let rawPercentage = (this.dailyCalories-this.leftCalories)/this.dailyCalories*100;
    rawPercentage = Math.min(rawPercentage, 100);
    this.caloriePercent = rawPercentage + '%';
  }

}
