import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-measurement-input',
  templateUrl: './measurement-input.component.html',
  styleUrls: ['./measurement-input.component.css']
})
export class MeasurementInputComponent {

  @Input() form !: FormGroup;
  @Input() isHidden = true;
  @Input() gender !: string;
}
