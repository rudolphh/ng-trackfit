import { BehaviorSubject, Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { UserSettings } from 'src/app/core/models/user-settings';

@Injectable({ providedIn: 'root'})
export class SettingsDataService {

  userSettingsDataSource !: BehaviorSubject<UserSettings>;

  constructor(private authService: AuthService, private userService: UserService) {
    const currentUser = this.authService.currentUserValue;
    this.userService.settings(currentUser).subscribe(
      (userSettings: UserSettings) => this.userSettingsDataSource.next(userSettings)
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

}

