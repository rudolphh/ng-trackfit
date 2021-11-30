import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { Settings } from 'src/app/core/models/settings';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser : User = {};
  userSettings !: Settings;

  constructor(
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {

    this.currentUser = this.authService.currentUserValue;
    this.userService.settings(this.currentUser)
      .then((settings : Settings) => {
        console.log(settings);
        if(settings) {
          this.userSettings = settings;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
