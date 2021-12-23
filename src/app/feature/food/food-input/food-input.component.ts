import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Food, FoodAdapter } from 'src/app/core/models/food.model';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { FoodService } from '../food.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-food-input',
  templateUrl: 'food-input.component.html',
  styleUrls: ['./food-input.component.css'],
})
export class FoodInputComponent implements OnInit {
  addFoodForm!: FormGroup;
  @Output() newFoodCreatedEvent: EventEmitter<Food> = new EventEmitter<Food>();

  @ViewChild('nameInput') nameInput!: ElementRef;

  searchText$!: Observable<string>;
  result$!: Observable<Food[]>;

  constructor(
    private fb: FormBuilder,
    private foodAdapter: FoodAdapter,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.addFoodForm = this.fb.group({
      name: ['', [Validators.required]],
      calories: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(4),
        ],
      ],
    });

    // tslint:disable-next-line: no-non-null-assertion
    this.searchText$ = this.addFoodForm.get('name')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(searchText => console.log('searchText: ', searchText))
    )!;

    this.getFoodSearchResults();
  }

  private loadFoods(searchText: string): Observable<Food[]> {

    return this.foodService.getFoodsByName(searchText);
  }

  private getFoodSearchResults(): void {
    // autocomplete
    this.result$ = this.searchText$
      .pipe(
        switchMap((searchText) => {
          if (searchText){
            return this.foodService.getFoodsByName(searchText);
          }
          return of([]);
        }),
        map((foods: Food[]) => {
          const seen = {};
          return foods.filter((item) =>
            seen.hasOwnProperty(item.calories)
              ? false
              : (seen[item.calories] = true)
          );
        })
      );
  }

  getFoodText(food: Food): string {
    return food.name;
  }

  setFood(option: MatOptionSelectionChange, food: Food): void {

    if (option.isUserInput){
      this.getFoodSearchResults();
      this.addFoodForm.get('calories')?.setValue(food.calories);
    }
  }

  resetForm(formDirective: FormGroupDirective): void {
    this.addFoodForm.reset();

    Object.keys(this.addFoodForm.controls).forEach((key) => {
      this.addFoodForm.get(key)?.setErrors(null);
    });
    this.nameInput.nativeElement.focus();

    formDirective.resetForm();
    this.getFoodSearchResults();
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.addFoodForm.valid) {
      return;
    }
    const { name, calories } = this.addFoodForm.value; // these are strings
    const now = Date.now();
    const newFood = this.foodAdapter.adapt({
      id: null,
      name,
      calories: +calories,
      date: now,
      createdAt: now,
      updatedAt: now,
    });

    this.newFoodCreatedEvent.emit(newFood); // output the new food created
    this.resetForm(formDirective);
  }
}
