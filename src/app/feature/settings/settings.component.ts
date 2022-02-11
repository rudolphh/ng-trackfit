import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { debounceTime, distinctUntilChanged, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import { SettingsDataService } from './settings-data.service';
import { Subject } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { UserSettings } from 'src/app/core/models/user-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy{
  currentUser!: User;
  userSettings!: UserSettings;
  settingsForm!: FormGroup;
  unsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private settingsDataService: SettingsDataService,
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      id: [],
      gender: [''],
      birthDate: [''],
      unit: ['imperial'],
      height: [],
      heightFeet: [],
      heightInch: [],
      heightCent: [],
      strategy: [],
      rate: [],
      reminderValue: [],
      reminderFrequency: [],
    });

    this.currentUser = this.authService.currentUserValue;
    this.settingsDataService.userSettings$.subscribe(
      (userSettings: UserSettings) => {
        this.userSettings = userSettings;

        if (Object.keys(userSettings).length !== 0) {
          const formValues = {
            height: 0,
            heightFeet: 0,
            heightInch: 0,
            heightCent: 0,
          };

          formValues.height = userSettings.height;
          if (userSettings.unit === 'imperial') {
            const inches = userSettings.height;
            formValues.heightFeet = Math.floor(inches / 12);
            formValues.heightInch = Math.round(inches % 12);
            formValues.heightCent = inches * 2.54;
          } else {
            const cm = userSettings.height;
            const totalInches = cm / 2.54;
            formValues.heightFeet = Math.floor(totalInches / 12);
            formValues.heightInch = Math.round(totalInches % 12);
            formValues.heightCent = cm;
          }

          this.settingsForm.patchValue({
            id: userSettings.id,
            gender: userSettings.gender,
            birthDate: userSettings.birthDate,
            unit: userSettings.unit,
            height: +formValues.height,
            heightCent: +formValues.heightCent,
            heightFeet: +formValues.heightFeet,
            heightInch: +formValues.heightInch,
            strategy: userSettings.strategy,
            rate: userSettings.rate,
            reminderValue: userSettings.reminderValue,
            reminderFrequency: userSettings.reminderFrequency,
          }, { onlySelf: true, emitEvent: false });
        }
    }); // end userSettings$ subscribe

    this.settingsForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      mergeMap((formValue: any) => {

        if (formValue.unit === 'imperial') {
          formValue.height = +formValue.heightFeet * 12 + +formValue.heightInch;
        } else {
          formValue.height = +formValue.heightCent;
        }
        return this.settingsDataService.updateUserSettings(this.formatSettings(formValue as UserSettings));
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe((form) => {
      //this.settingsDataService.setUserSettings(form);
    });

  }

  formatSettings(userSettings: any): any {
    return {
      id: +userSettings.id,
      gender: userSettings.gender,
      birthDate: userSettings.birthDate,
      unit: userSettings.unit,
      height: +userSettings.height,
      heightCent: +userSettings.heightCent,
      heightFeet: +userSettings.heightFeet,
      heightInch: +userSettings.heightInch,
      strategy: userSettings.strategy,
      rate: +userSettings.rate,
      reminderValue: +userSettings.reminderValue,
      reminderFrequency: userSettings.reminderFrequency,
    }
  }

  onSubmit(formDirective: FormGroupDirective): void {}

  onUnitChange(unit: string): void {
    console.log(unit);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
