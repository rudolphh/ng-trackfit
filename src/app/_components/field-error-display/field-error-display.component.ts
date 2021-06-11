import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldErrorDisplayComponent {
  @Input() errorMsg !: string;
  @Input() displayError !: boolean;
}
