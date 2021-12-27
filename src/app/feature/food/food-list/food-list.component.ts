import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit } from '@angular/core';

import { Food } from 'src/app/core/models/food.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-food-list',
  templateUrl: 'food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  @Input() maxFoodsDisplayed = 3;
  @Output() optionClicked: EventEmitter<void> = new EventEmitter<void>();
  foodsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.foodsForm = this.fb.group({
      foods: this.fb.array([])
    });
  }

  get foodsFormArray(): FormArray{
    return this.foodsForm.get('foods') as FormArray;
  }

  get foodsControls(): AbstractControl[] {
    return this.foodsFormArray.controls.slice(0, this.maxFoodsDisplayed);
  }

  optionClick(): void {
    this.optionClicked.emit();
  }

}
