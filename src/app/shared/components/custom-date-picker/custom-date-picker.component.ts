import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.css']
})
export class CustomDatePickerComponent implements OnInit {

  @Input() currentDate: Date | null = new Date();
  @Output() newDateSelectedEvent: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {}

  selectDate(date: Date): void {
    this.currentDate = date;
    $('#datePicker').modal('hide');
    this.newDateSelectedEvent.emit(this.currentDate as Date);
  }

  addDay(): boolean {
    const result = new Date(this.currentDate as Date);
    result.setDate(result.getDate() + 1);
    this.currentDate = result;
    this.newDateSelectedEvent.emit(this.currentDate as Date);
    return false;
  }

  subDay(): boolean {
    const result = new Date(this.currentDate as Date);
    result.setDate(result.getDate() - 1);
    this.currentDate = result;
    this.newDateSelectedEvent.emit(this.currentDate as Date);
    return false;
  }
}
