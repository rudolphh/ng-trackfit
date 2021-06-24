import { Component, OnInit } from '@angular/core';
import { Measurement } from 'src/app/_models/measurement';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { MeasurementService } from 'src/app/_services/measurement.service';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {

  user !: User;
  isFemale : boolean = false;
  measurements !: Measurement [];

  weightUnit !: string;
  lengthUnit !: string

  constructor(
    private authService: AuthService,
    private measurementService: MeasurementService
    ) { }

  ngOnInit(): void {

    this.user = this.authService.currentUserValue;
    this.isFemale = this.user.settings?.gender === 'female';

    this.weightUnit = this.user.settings?.unit === 'imperial' ? 'lbs.' : 'kg';
    this.lengthUnit = this.user.settings?.unit === 'imperial' ? 'in.' : 'cm';


    this.measurementService.getAllMeasurements()
      .then((measurements) => this.measurements = measurements)
      .catch((error) => console.error(error));
  }

}
