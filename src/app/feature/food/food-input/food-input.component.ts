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
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { FoodDataService } from '../services/food-data.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-food-input',
  templateUrl: 'food-input.component.html',
  styleUrls: ['./food-input.component.css'],
})
export class FoodInputComponent implements OnInit {
  @Output() newFoodCreatedEvent: EventEmitter<Food> = new EventEmitter<Food>();
  @ViewChild('nameInput') nameInput!: ElementRef;
  addFoodForm!: FormGroup;
  autocompleteOptions$$!: Observable<Food[]>;
  macroOptions = false;

  constructor(
    private fb: FormBuilder,
    private foodAdapter: FoodAdapter,
    private foodDataService: FoodDataService
  ) {}

  ngOnInit(): void {
    this.addFoodForm = this.fb.group({
      mealTime: ['breakfast'],
      name: ['', [Validators.required]],
      calories: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(4),
        ],
      ],
      protein: [''],
      carbohydrate: [''],
      fat: ['']
    });

    this.autocompleteOptions$$ = this.foodDataService.autocompleteOptions$;

    const searchText$ = this.addFoodForm.get('name')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      //tap((searchText) => console.log('searchText: ', searchText)),
      // null (after selecting autocomplete option), or special characters return empty string
      map((searchText) =>
        searchText ? searchText.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, '') : ''
      )
    );

    searchText$?.subscribe((searchText) =>
      this.foodDataService.updateAutocompleteOptions(searchText)
    );
  }

  setFood(option: MatOptionSelectionChange, food: Food): void {
    if (option.isUserInput) {
      // the name control is set automatically so just clear autocomplete options
      this.foodDataService.updateAutocompleteOptions('');
      this.addFoodForm.get('calories')?.setValue(food.calories);
      this.addFoodForm.get('protein')?.setValue(food.protein);
      this.addFoodForm.get('carbohydrate')?.setValue(food.carbohydrate);
      this.addFoodForm.get('fat')?.setValue(food.fat);
    }
  }

  resetForm(formDirective: FormGroupDirective): void {
    Object.keys(this.addFoodForm.controls).forEach((key) => {
      this.addFoodForm.get(key)?.setErrors(null);
    });

    this.addFoodForm.reset();
    formDirective.resetForm();

    this.foodDataService.updateAutocompleteOptions('');
    this.nameInput.nativeElement.focus();
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.addFoodForm.valid) {
      return;
    }
    const { name, calories, protein, carbohydrate, fat, mealTime } = this.addFoodForm.value; // these are strings
    const now = Date.now();
    const newFood = this.foodAdapter.adapt({
      id: null,
      name,
      calories,
      protein,
      carbohydrate,
      fat,
      date: now,
      createdAt: now,
      updatedAt: now,
      mealTime
    });
    this.newFoodCreatedEvent.emit(newFood); // output the new food created
    this.resetForm(formDirective);
  }

  toggleMacroOptions(): void {
    this.macroOptions = !this.macroOptions;
  }
}
