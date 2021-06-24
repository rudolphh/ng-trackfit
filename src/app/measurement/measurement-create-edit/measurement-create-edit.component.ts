import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-measurement-create-edit',
  templateUrl: './measurement-create-edit.component.html',
  styleUrls: ['./measurement-create-edit.component.css']
})
export class MeasurementCreateEditComponent implements OnInit {
  minDate !: Date;
  maxDate !: Date;
  fontStyleControl = new FormControl();
  fontStyle?: string;

  constructor() {
      // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(currentYear - 20, 0, 1);
      this.maxDate = new Date(currentYear + 1, 11, 31);
   }

  ngOnInit(): void {
  }

}
