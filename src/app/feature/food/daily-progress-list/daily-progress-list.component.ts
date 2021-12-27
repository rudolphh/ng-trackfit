import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { DatePipe } from '@angular/common';
import { Food } from 'src/app/core/models/food.model';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-daily-progress-list',
  templateUrl: './daily-progress-list.component.html',
  styleUrls: ['./daily-progress-list.component.css']
})
export class DailyProgressListComponent implements OnInit, OnDestroy {

  @ViewChild('foodsSelect') foodsSelect!: MatSelectionList;

  @Input() foods!: Observable<Food[]>;
  dbFoods: Food[] = [];

  @Output() setFoodsEvent: EventEmitter<Food[]> = new EventEmitter<Food[]>();

  @Input() maxCalories = 1800;
  remainingCalories!: number;
  percentOfDaily = 0;

  allFoodsSelected = false;
  maxFoodsDisplayed = 3;

  foodsForm!: FormGroup;

  unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private foodService: FoodService
    ) {
    this.remainingCalories = this.maxCalories;
  }

  ngOnInit(): void{
    this.foodsForm = this.fb.group({
      foods: this.fb.array([])
    });

    // initialize remaining calories
    this.foods.subscribe((foods: Food[]) => {
      this.foodsFormArray.clear();
      this.dbFoods = foods;

      foods.map((food: Food) => {
        this.addNewFood(food);
      });
      this.percentOfDaily = this.updatePercent();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // form methods

  get foodsFormArray(): FormArray{
    return this.foodsForm.get('foods') as FormArray;
  }

  addNewFood(food: Food): void {
    this.foodsFormArray.push(this.newFoodFormGroup(food));
  }

  removeFood(index: number): void {
    this.foodsFormArray.removeAt(index);
  }

  newFoodFormGroup(food: Food): FormGroup {
    const newFoodGroup = this.fb.group({
      id: [food.id],
      date: [food.date],
      time: [
        this.datePipe.transform(food.date, 'HH:mm'),
        [
          Validators.required
        ]
      ],
      name: [food.name, Validators.required],
      calories: [
        food.calories,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(4),
        ]
      ]
    });

    newFoodGroup.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(formValue => {
        console.log('update food');
        return this.foodService.updateFood(formValue);
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(value => {
      console.log(value);
      this.percentOfDaily = this.updatePercent();
    });

    return newFoodGroup;
  }

  resetDefaults(): void {
    this.allFoodsSelected = false;
    this.maxFoodsDisplayed = 3;
    this.foodsSelect.deselectAll();
  }

  updatePercent(): number {
    const currentCalories: number = this.foodsFormArray.controls.reduce((prev, curr) => {
      return prev + +curr.value.calories;
    }, 0);

    this.remainingCalories = this.maxCalories - currentCalories;
    return (currentCalories / this.maxCalories) * 100;
  }

  selectAllChange(): void {
    this.allFoodsSelected = !this.allFoodsSelected;

    if (this.allFoodsSelected) {
      this.maxFoodsDisplayed = this.dbFoods.length;
      setTimeout(() => {
        this.foodsSelect.selectAll();
      });
    } else {
      this.foodsSelect.deselectAll();
      this.maxFoodsDisplayed = 3;
    }

  }

  optionClick(): void {
    let newStatus = true;
    this.foodsSelect.options.forEach((item: MatListOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allFoodsSelected = newStatus;
  }

  deleteSelected(): void {
    const selectedOptions = this.foodsSelect.selectedOptions;
    const selectedFoods = selectedOptions.selected.map(option => option.value.value);

    const allFoods = this.foodsFormArray.controls.map((option, index) => option.value);
    const remainingFoods = allFoods.filter(option => !selectedFoods.includes(option));

    const idsToDelete = selectedFoods.map(food => food.id);

    this.foodService.deleteFoods(idsToDelete).pipe(take(1)).subscribe(response => {
      if (response.success) {
        this.setFoodsEvent.emit(remainingFoods);
      }
    });
  }

  loadMore(): void {
    if (this.dbFoods.length > this.maxFoodsDisplayed){
      this.maxFoodsDisplayed += 3;
    }
  }

  loadReset(): void {
    this.maxFoodsDisplayed = 3;
  }

  anySelected(): boolean {
    return this.foodsSelect.selectedOptions.selected.length > 0;
  }

  trackByFn(index: any, item: { id: any; }): any {
    return item.id; // unique id corresponding to the item
  }
}
