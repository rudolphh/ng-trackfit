import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.userService.settings(this.currentUser).subscribe(
      (userSettings: UserSettings) => this.userSettings = userSettings
    );
  }
}
