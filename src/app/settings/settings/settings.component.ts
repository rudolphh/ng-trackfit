import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/_models/settings';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

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
