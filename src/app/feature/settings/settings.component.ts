import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { SettingsDataService } from './settings-data.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { UserSettings } from 'src/app/core/models/user-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  currentUser !: User;
  userSettings!: UserSettings;

  settingsForm !: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService, private fb: FormBuilder,
    private settingsDataService: SettingsDataService
  ) {}

  ngOnInit(): void {

    this.settingsForm = this.fb.group({
      gender: [''],
      birthDate: [''],
      unit: ['imperial'],
      heightFeet: [],
      heightInch: [],
      heightCent: [],
      strategy: [],
      rate: [],
      reminderValue: [],
      reminderFrequency: []
    });

    this.currentUser = this.authService.currentUserValue;
    this.settingsDataService.userSettings$.subscribe(
      (userSettings: UserSettings) => {
        this.userSettings = userSettings;
        console.log('hello settings', userSettings.gender);

        if (Object.keys(userSettings).length !== 0) {
        const formValues = {
          heightFeet: 0,
          heightInch: 0,
          heightCent: 0
        };

        if (userSettings.unit === 'imperial') {
          formValues.heightFeet = Math.floor(userSettings.height / 12);
          formValues.heightInch = userSettings.height % 12;
          formValues.heightCent = userSettings.height * 2.54;
        }
        this.settingsForm.patchValue({
          gender: userSettings.gender,
          birthDate: userSettings.birthDate,
          unit: userSettings.unit,
          ...formValues,
          strategy: userSettings.strategy,
          rate: userSettings.rate,
          reminderValue: userSettings.reminderValue,
          reminderFrequency: userSettings.reminderFrequency
        });
      }
      }
    );
  }

  onSubmit(formDirective: FormGroupDirective): void {

  }

  onUnitChange(unit: string): void {
    console.log(unit);
  }
}
