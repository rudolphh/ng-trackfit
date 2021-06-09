import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser : any;

  constructor(private storageService : StorageService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.storageService.watchStorage().subscribe((data:string) => {
      // this will call whenever your localStorage data changes
      // use localStorage code here and set your data here for ngFor
      //this.currentUser = JSON.parse(data);
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);

    });

  }

  logout() {
    this.storageService.removeItem('currentUser');
  }

  // helper

  isObject(obj : any) {
    return obj === Object(obj);
  }

  isEmpty(obj : Object) : boolean {
    return Object.keys(obj).keys.length === 0;
  }

}
