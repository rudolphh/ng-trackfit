import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Food, FoodAdapter } from 'src/app/core/models/food.model';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Validators } from '@angular/forms';

@Component({
  selector: 'app-food-input',
  templateUrl: 'food-input.component.html',
  styleUrls: ['./food-input.component.css']
})
export class FoodInputComponent implements OnInit {

  addFoodForm!: FormGroup;
  @Output() newFoodCreatedEvent: EventEmitter<Food> = new EventEmitter<Food>();

  constructor(private fb: FormBuilder, private foodAdapter: FoodAdapter) {}

  ngOnInit(): void {
    this.addFoodForm = this.fb.group({
      name: [
        '',
        [
          Validators.required
        ]
      ],
      calories: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(4)
        ]
      ],
    });
  }

  addFood(): void {

  }

  onSubmit(): void {
    if (!this.addFoodForm.valid) {
      return;
    }
    console.log(this.addFoodForm.value);
    const { name, calories } = this.addFoodForm.value;
    const newFood = this.foodAdapter.adapt({ id: null, name, calories, created: new Date() });
    this.newFoodCreatedEvent.emit(newFood);
  }
}
