import { Component } from '@angular/core';
import { User } from './_models/user';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    // let user: User = {
    //   username: 'blahblah',
    //   email: 'blahblah@blah.com',
    //   password: 'blahblah',
    //   passwordConfirm: 'blahblah'
    // };

    // this.userService.register(user).subscribe(response => {console.log(user)});
  }
}
