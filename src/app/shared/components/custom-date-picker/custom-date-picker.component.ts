import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css'],
})
export class CustomDatePickerComponent implements OnInit {
  @Input() currentDate: Date = new Date();
  @Input() disabled = false;
  @Output() newDateSelectedEvent: EventEmitter<Date> = new EventEmitter<Date>();

  get disabledStyle(): {} {
    return {
      'pointer-events': this.disabled ? 'none' : 'auto',
      opacity: this.disabled ? '0.6' : '1',
    };
  }

  constructor() {}

  ngOnInit(): void {}

  selectDate(date: Date): void {
    this.currentDate = date;
    $('#datePicker').modal('hide');
    this.newDateSelectedEvent.emit(this.currentDate as Date);
  }

  addDay(): boolean {
    return this.changeDayBy(1);
  }

  subDay(): boolean {
    return this.changeDayBy(-1);
  }

  changeDayBy(value: number): boolean {
    const result = new Date(this.currentDate);
    result.setDate(result.getDate() + value);

    this.currentDate = result;
    this.currentDate.setHours(0, 0, 0, 0);

    this.newDateSelectedEvent.emit(this.currentDate);
    return false;
  }
}
