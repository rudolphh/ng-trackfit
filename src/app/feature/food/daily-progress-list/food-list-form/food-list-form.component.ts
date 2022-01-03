import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit } from '@angular/core';

import { Food } from 'src/app/core/models/food.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-food-list-form',
  templateUrl: 'food-list-form.component.html',
  styleUrls: ['./food-list-form.component.css']
})
export class FoodListFormComponent implements OnInit {

  @Input() maxFoodsDisplayed = 3;
  @Output() optionClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() length: EventEmitter<number> = new EventEmitter<number>();
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

  onFocusEvent(event: any, locals: any): void {
    console.log('on focus');
    locals.isHidden = false;
  }

  onBlurEvent(event: any, locals: any): void {
    //console.log(event.target);
    locals.isHidden = true;
  }

}
