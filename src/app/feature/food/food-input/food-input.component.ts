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

  constructor(private fb: FormBuilder, private foodAdapter: FoodAdapter) {}

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
