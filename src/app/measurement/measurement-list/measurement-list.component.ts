import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/_models/settings';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {

  private user !: User;
  userSettings !: Settings;


  isFemale : boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.userService.settings(this.user).then((settings) => {
      this.userSettings = settings;
      this.isFemale = this.userSettings.gender === 'female' ?? false;
    });
  }

}
