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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.currentUser.subscribe((user:User) => {
      // this will call whenever your localStorage data changes
      // use localStorage code here and set your data here for ngFor
      //this.currentUser = JSON.parse(data);
      console.log(user);
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  // helper

  isObject(obj : any) {
    return obj === Object(obj);
  }

  isEmpty(obj : Object) : boolean {
    return Object.keys(obj).keys.length === 0;
  }

}
