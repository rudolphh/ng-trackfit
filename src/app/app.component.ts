import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AuthService } from './core/services/auth.service';
import { Measurement } from './core/models/measurement';
import { MeasurementDataService } from './feature/measurement/measurement-data.service';
import { SettingsDataService } from './feature/settings/settings-data.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public authError: Observable<string> = of('');

  constructor(
    private measurementDataService: MeasurementDataService
  ) {
    //this.measurementDataService.getAllMeasurements().subscribe((measurements: Measurement[]) => measurements);
  }

  ngOnInit(): void {

  }
}
