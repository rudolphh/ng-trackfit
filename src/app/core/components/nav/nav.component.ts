import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser !: User;
  objectKeys = Object.keys;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.currentUser.subscribe((user: User) => {
      // this will call whenever your localStorage data changes
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
