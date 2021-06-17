import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  userSettings : Settings = {};

  settingsForm = new FormGroup({
    gender : new FormControl(''),
    birthDate : new FormControl(''),
    height : new FormControl(''),
    unit : new FormControl(''),
    dietType : new FormControl(''),
    rate : new FormControl(''),
    reminderFrequency : new FormControl('')
  });

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
        this.userSettings = settings['data'];
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  updateSettings() {
    this.settingsForm.patchValue({
      gender: '',
      birthDate: '',
      height: '',
      unit: '',
      diet: '',
      rate: '',
      reminderFrequency: ''
    });
  }

  // function name(params:type) {
  // this.http.patch()
  // }
}
