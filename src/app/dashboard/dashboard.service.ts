import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URL } from '../../environments/environment'; 
import { HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // initialized properties 
  latestBodyFat: number = 25 ; 
  dailyCalories: number = 1800; 
  leftCalories: number = 0; 
  caloriePercent: string = "0%";  

  constructor(private http: HttpClient) { }

  // Event Emitter to alert user no data was entered (either name or calories of the food)
  statusInput = new EventEmitter <string>(); 

  // Subject to update leftCalories
  private calorieSubject = new BehaviorSubject<number>(0); 
  calorieChanged = this.calorieSubject.asObservable(); 

  //------------------------------------- http request -----------------------------------------//
  getFoods(): Promise<any>{
    return this.http.get(`${API_URL}/foods`).toPromise();  
  }

  async addFoods(body: {name: string, calories: number}){
    await this.http.post(`${API_URL}/foods`, body).toPromise();
  }

  async deleteFoods(foodID: string){
    await this.http.delete(`${API_URL}/foods/${foodID}`).toPromise(); 
  }

  //--------------------------- update calories left and progress bar ---------------------------//
  // function that uses Behavior Subject to communicate between 
  //components and update calories left
  updateCaloriesLeft(cal: number){
    this.leftCalories = cal; 
    this.calorieSubject.next(this.leftCalories); 
  }

  // update the perecent to update the progress bar
  updateCaloriePercent(){
    let rawPercentage = (this.dailyCalories-this.leftCalories)/this.dailyCalories*100;
    rawPercentage = Math.min(rawPercentage, 100);
    this.caloriePercent = rawPercentage + '%';
  }

}
