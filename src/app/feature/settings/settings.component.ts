import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

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
    private settingsDataService: SettingsDataService
  ) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      id: [],
      gender: [''],
      birthDate: [''],
      unit: ['imperial'],
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
console.log('this.userSettings', this.userSettings)
        if (Object.keys(userSettings).length !== 0) {
          const formValues = {
            heightFeet: 0,
            heightInch: 0,
            heightCent: 0,
          };

          if (userSettings.unit === 'imperial') {
            formValues.heightFeet = Math.floor(userSettings.height / 12);
            formValues.heightInch = userSettings.height % 12;
            formValues.heightCent = userSettings.height * 2.54;
          } else {
            formValues.heightCent = userSettings.height;
            const totalInches = formValues.heightCent / 2.54;
            formValues.heightFeet = Math.floor(totalInches / 12);
            formValues.heightInch = totalInches % 12;
          }

          this.settingsForm.patchValue({
            id: userSettings.id,
            gender: userSettings.gender,
            birthDate: userSettings.birthDate,
            unit: userSettings.unit,
            ...formValues,
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
      switchMap((formValue: any) => {
        formValue.height = formValue.heightCent;
        delete formValue.heightCent;
        delete formValue.heightFeet;
        delete formValue.heightInch;
        console.log('update settings: ', formValue);

        return this.settingsDataService.updateUserSettings(formValue as UserSettings);
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe((form) => {
      console.log('form', form);
      //this.settingsDataService.setUserSettings(form);
    });

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
