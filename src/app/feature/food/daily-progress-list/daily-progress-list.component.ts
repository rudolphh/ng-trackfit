import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { catchError, take } from 'rxjs/operators';

import { DatePipe } from '@angular/common';
import { Food } from 'src/app/core/models/food.model';
import { FoodService } from '../food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily-progress-list',
  templateUrl: './daily-progress-list.component.html',
  styleUrls: ['./daily-progress-list.component.css']
})
export class DailyProgressListComponent implements OnInit, AfterViewInit {

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
  }

  ngAfterViewInit(): void {
    // initialize remaining calories
    this.foods.subscribe((foods: Food[]) => {
      this.foodsFormArray.clear();
      this.dbFoods = foods;
      this.update();

      foods.map((food: Food) => {
        this.addNewFood(food);
      });
    });
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
    return this.fb.group({
      id: [food.id],
      date: [food.date],
      formDate: [
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
  }

  update(): void {
    this.percentOfDaily = this.updatePercent();
    this.allFoodsSelected = false;
    this.maxFoodsDisplayed = 3;
    this.foodsSelect.deselectAll();
  }

  updatePercent(): number {
    const currentCalories: number = this.dbFoods.reduce((prev, curr) => {
      return prev + curr.calories;
    }, 0);

    this.remainingCalories = this.maxCalories - currentCalories;
    return (currentCalories / this.maxCalories) * 100;
  }

  selectAllChange(): void {
    this.allFoodsSelected = !this.allFoodsSelected;
    // this.foodsSelect.options.forEach(
    //   (item: MatListOption) => (item.selected = this.allFoodsSelected)
    // );
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
    const foodOptions = this.foodsSelect.options;
    const selectedOptions = this.foodsSelect.selectedOptions;

    const selectedFoods = selectedOptions.selected.map(option => option.value.value);
    console.log(selectedFoods);

    const allFoods = this.foodsFormArray.controls.map((option, index) => option.value);
    console.log(allFoods);

    const remainingFoods = allFoods.filter(option => !selectedFoods.includes(option));
    console.log(remainingFoods);

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

  remainingCaloriesColor(): string {
    return this.percentOfDaily < 75
      ? 'light-text-success'
      : this.percentOfDaily < 100
        ? 'light-text-primary'
        : 'light-text-danger';
  }

  progressBarColor(): string {
    // background-color: #2aa198; success
    // #b58900; primary
    // d33682; danger
    return this.percentOfDaily < 75
      ? 'success-progress'
      : this.percentOfDaily < 100
        ? 'primary-progress'
        : 'danger-progress';
  }

  trackByFn(index: any, item: { id: any; }): any {
    return item.id; // unique id corresponding to the item
 }
}
