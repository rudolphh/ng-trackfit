import { BehaviorSubject, Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { UserSettings } from 'src/app/core/models/user-settings';

@Injectable({ providedIn: 'root'})
export class SettingsDataService {

  userSettingsDataSource = new BehaviorSubject<UserSettings>({} as any);
  currentUser !: User;

  constructor(private authService: AuthService, private userService: UserService) {
    this.currentUser = this.authService.currentUserValue;
    this.userService.settings(this.currentUser).subscribe(
      (userSettings: UserSettings) => {
        this.userSettingsDataSource.next(userSettings);
      }
    );
  }

  get userSettings(): UserSettings {
    return this.userSettingsDataSource.getValue();
  }

  get userSettings$(): Observable<UserSettings> {
    return this.userSettingsDataSource.asObservable();
  }

  setUserSettings(userSettings: UserSettings): void {
    this.userSettingsDataSource.next(userSettings);
  }

  updateUserSettings(userSettings: UserSettings): Observable<UserSettings> {
    let obs = this.userService.updateSettings(this.currentUser, userSettings);

    obs.subscribe(settings => this.userSettingsDataSource.next(userSettings));

    return obs;
  }

}

