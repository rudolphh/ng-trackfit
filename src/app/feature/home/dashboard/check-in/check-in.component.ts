import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Food } from 'src/app/core/models/food.model';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Measurement } from '../../../../core/models/measurement';
import { MeasurementAdapter } from 'src/app/core/models/measurement';
import { MeasurementService } from 'src/app/feature/measurement/measurement.service';
import { UserSettings } from 'src/app/core/models/user-settings';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements AfterViewChecked {

  @Input() userSettings !: UserSettings;
  @Output() newMeasurementCreatedEvent: EventEmitter<Measurement> = new EventEmitter<Measurement>();
  @ViewChild('weightInput') weightInput!: ElementRef;
  @ViewChild('unit') unit !: MatButtonToggleGroup;
  unitValue !: string;
  addMeasureForm !: FormGroup;
  measureOptions = false;

  constructor(
    private fb: FormBuilder,
    private measurementAdapter: MeasurementAdapter,
    private cdRef: ChangeDetectorRef
    ) {

    const validators = [
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(3),
    ];

    this.addMeasureForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(80), ...validators]],
      unit: ['imperial'],
      neck: ['', validators],
      waist: ['', validators],
      hips: ['', validators],
    });

  }
  
  ngAfterViewChecked(): void {
    this.unitValue = this.unit.value === 'imperial' ? 'lbs' : 'kg';
    this.cdRef.detectChanges();
  }

  resetForm(formDirective: FormGroupDirective): void {
    Object.keys(this.addMeasureForm.controls).forEach((key) => {
      this.addMeasureForm.get(key)?.setErrors(null);
    });

    this.addMeasureForm.reset();
    formDirective.resetForm();
    this.addMeasureForm.patchValue({
      unit: this.userSettings.unit
    });

    this.weightInput.nativeElement.focus();
  }

  onSubmit(formDirective: FormGroupDirective): void {

    console.log(this.addMeasureForm.value);

    if (!this.addMeasureForm.valid) {
      return;
    }
    const { weight, unit, neck, waist, hips } = this.addMeasureForm.value; // these are strings
    const now = Date.now();
    const newMeasurement = this.measurementAdapter.adapt({
      id: null,
      weight,
      unit,
      neck,
      waist,
      hips,
      date: now,
      createdAt: now,
      updatedAt: now,
    });
    this.newMeasurementCreatedEvent.emit(newMeasurement); // output the new food created
    this.resetForm(formDirective);
  }

  toggleMeasureOptions(): void {
    this.measureOptions = !this.measureOptions;
  }
}
