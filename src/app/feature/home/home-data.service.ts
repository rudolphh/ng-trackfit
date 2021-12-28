import { BehaviorSubject, Observable } from 'rxjs';

import { Food } from 'src/app/core/models/food.model';
import { FoodService } from '../food/food.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {

  dateDataSource: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  constructor() {

  }

  get date(): Date {
    return this.dateDataSource.getValue();
  }


}
