import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {

  private dateDataSource: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  constructor() {}

  get currentDate(): Observable<Date> {
    return this.dateDataSource.asObservable();
  }

  setCurrentDate(date: Date): void {
    date.setHours(0, 0, 0, 0);
    this.dateDataSource.next(date);
  }


}
