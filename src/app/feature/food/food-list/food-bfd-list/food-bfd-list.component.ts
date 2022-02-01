import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-food-bfd-list',
  templateUrl: './food-bfd-list.component.html',
  styleUrls: ['./food-bfd-list.component.css']
})
export class FoodBFDListComponent {

  @Input() arrayIndex !: string;
  @Input() formArray !: FormArray;
  @Input() isHidden = {};
  @Input() theForm !: FormGroup;

  @Output() focusEvent = new EventEmitter<number>();
  @Output() blurEvent = new EventEmitter<number>();
  @Output() optionClick = new EventEmitter<void>();

  onFocusEvent(foodId: any): void {
    this.focusEvent.emit(foodId);
  }

  onBlurEvent(foodId: any): void {
    this.blurEvent.emit(foodId);
  }

  optionClicked(): void {
    this.optionClick.emit();
  }
}
