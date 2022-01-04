import { Component, EventEmitter, Input } from "@angular/core";

import { FormGroup } from "@angular/forms";
import { Output } from "@angular/core";

@Component({
  selector: 'app-macro-input',
  templateUrl: './macro-input.component.html'
})
export class MacroInputComponent {

  @Input() isHidden !: boolean;
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
