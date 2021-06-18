import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { ApiResponse } from '../_models/api-response';
import { HttpParams } from '@angular/common/http';
import { EnvService } from '../_services/env.service';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user: User = {};
 
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private env: EnvService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      passwordConfirm: this.user.passwordConfirm      
  });

    
  }
   /// get f() {return this.form.controls}

    onSubmit(){    
      
      this.userService
       .register(this.registerForm.value)
       .subscribe(()=>{
          console.log(`${this.env.apiUrl}/register`)
       }) 

       
       
        

    console.log(this.registerForm.value)
    }     
}

