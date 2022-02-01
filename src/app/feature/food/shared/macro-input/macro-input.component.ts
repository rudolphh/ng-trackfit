import { Component, EventEmitter, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Output } from '@angular/core';

@Component({
  selector: 'app-macro-input',
  templateUrl: './macro-input.component.html'
})
export class MacroInputComponent {

  @Input() isHidden = true;
  @Output() focused: EventEmitter<void> = new EventEmitter<void>();
  @Output() blurred: EventEmitter<void> = new EventEmitter<void>();

  @Input() form!: FormGroup;
  @Input() fArrayName !: string;
  @Input() foodIndex!: number;

  constructor() {}

  ngOnInit() {}

  onFocusEvent(): void {
    this.focused.emit();
  }

  onBlurEvent(): void {
    this.blurred.emit();
  }
}
