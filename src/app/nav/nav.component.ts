import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser : User = {};
  objectKeys = Object.keys;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.currentUser.subscribe((user:User) => {
      // this will call whenever your localStorage data changes
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }

}
