import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Food, FoodAdapter } from 'src/app/core/models/food.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

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

    this.getFoodSearchResults();
  }

  private getFoodSearchResults(): void {
    // autocomplete
    this.result$ =
      this.addFoodForm.get('name')?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(searchText => console.log('searchText: ', searchText)),
        switchMap((searchText) => searchText
          ? this.foodService.getFoodsByName(searchText) : of([])),
        map((foods) => {
          const seen = {};
          return foods.filter((item) =>
            seen.hasOwnProperty(item.calories)
              ? false
              : (seen[item.calories] = true)
          );
        })
      ) || of([]);
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

  resetForm(): void {
    this.addFoodForm.reset();
    Object.keys(this.addFoodForm.controls).forEach((key) => {
      this.addFoodForm.get(key)?.setErrors(null);
    });
    this.nameInput.nativeElement.focus();
  }

  onSubmit(): void {
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
    this.resetForm();
  }
}
