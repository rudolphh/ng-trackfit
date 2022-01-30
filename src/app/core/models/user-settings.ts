import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';
export class UserSettings {
  constructor(
    public id: number,
    public gender: string,
    public birthDate: Date,
    public height: number,
    public unit: string,
    public strategy: string,
    public rate: number,
    public reminderValue: number,
    public reminderFrequency: string
  ) {}
}

@Injectable({ providedIn: 'root' })
export class UserSettingsAdapter implements Adapter<UserSettings> {
  adapt(settings: any): UserSettings {
    return new UserSettings(
      settings.id,
      settings.gender,
      settings.birthDate,
      settings.height,
      settings.unit,
      settings.strategy,
      settings.rate,
      settings.reminderValue,
      settings.reminderFrequency
    );
  }
}
