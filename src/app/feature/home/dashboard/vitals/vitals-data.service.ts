import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({providedIn: 'root'})
export class VitalsDataService {

  private bodyWeightSubject$ = new BehaviorSubject<number>(0);
  bodyWeight$ = this.bodyWeightSubject$.asObservable();

  private bodyFatSubject$ = new BehaviorSubject<number>(0.0);
  bodyFat$ = this.bodyFatSubject$.asObservable();

  private leanBodyMassSubject$ = new BehaviorSubject<number>(0);
  leanBodyMass$ = this.leanBodyMassSubject$.asObservable();

  private bmrSubject$ = new BehaviorSubject<number>(0);
  bmr$ = this.bmrSubject$.asObservable();

  // setters

  setBodyWeight(weight: number): void {
    this.bodyWeightSubject$.next(weight);
  }

  setBodyFat(bodyFat: number): void {
    this.bodyFatSubject$.next(bodyFat);
  }

  setLeanBodyMass(leanBodyMass: number): void {
    this.leanBodyMassSubject$.next(leanBodyMass);
  }

  setBMR(bmr: number): void {
    this.bmrSubject$.next(bmr);
  }
}
