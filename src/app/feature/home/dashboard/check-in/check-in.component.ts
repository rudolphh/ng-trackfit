import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Component } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {

  addMeasureForm !: FormGroup;
  measureOptions = false;

  constructor(private fb: FormBuilder) {

    const validators = [
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(4),
    ]

    this.addMeasureForm = this.fb.group({
      weight: ['', [Validators.required, ...validators]],
      unit: ['imperial'],
      neck: ['', validators],
      waist: ['', validators],
      hips: ['', validators],
    });

  }

  onSubmit(formDirective: FormGroupDirective): void {

    console.log(this.addMeasureForm.value);
  }

  toggleMeasureOptions(): void {
    this.measureOptions = !this.measureOptions;
  }
}
