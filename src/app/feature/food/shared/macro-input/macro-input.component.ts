import { Component, EventEmitter, Input, NgModule } from "@angular/core";

import { FormGroup } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Output } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: 'app-macro-input',
  templateUrl: './macro-input.component.html'
})
export class MacroInputComponent {

  @Input() isHidden = true;
  @Output() onFocus: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBlur: EventEmitter<void> = new EventEmitter<void>();

  @Input() form!: FormGroup;
  @Input() foodIndex!: number;

  constructor() {}

  ngOnInit() {}

  onFocusEvent(): void {
    this.onFocus.emit();
  }

  onBlurEvent(): void {
    this.onBlur.emit();
  }
}
