import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { EnvService } from '../_services/env.service';
import { ApiResponse } from '../_models/api-response';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user: User = {};
  submitted = false;
  attemptedSubmit: boolean = false;
  authError: any;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private env: EnvService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [this.user.passwordConfirm,[Validators.required, Validators.minLength(6)]]
  }, {Validator: this.checkIfMatchingPasswords('password', 'passwordConfirm')});

  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({error: String})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }
   /// get f() {return this.form.controls}

    onSubmit(){
      if(this.registerForm.valid){


      this.submitted = true;
      this.userService
       .register(this.registerForm.value)
       .subscribe((res: ApiResponse)=>{
          if (!res.data) {
            this.authError = res.message;
            return;
          }
          this.router.navigate(['../login'])
          console.log(res.message)
       })

      } else {
        this.attemptedSubmit = true;
        this.validateAllFormFields(this.registerForm)
      }



    ///console.log(this.registerForm.value)
    }

    isRequiredFieldValid(field: string){
        return(
          this.attemptedSubmit &&
          this.registerForm.get(field)!.touched &&
          this.registerForm.get(field)!.errors?.required
        );
    }

    isPatternFieldValid(field: string){
      return (
        this.attemptedSubmit &&
        this.registerForm.get(field)!.touched &&
        this.registerForm.get(field)!.errors?.pattern
      );
    }

    displayFieldCss(field: string) {
      return {
        'is-invalid':
          this.attemptedSubmit &&
          this.registerForm.get(field)!.invalid &&
          this.registerForm.get(field)!.touched,
      };
    }

    validateAllFormFields(formGroup: FormGroup) {
      //{1}
      Object.keys(formGroup.controls).forEach((field) => {
        //{2}
        const control = formGroup.get(field); //{3}
        if (control instanceof FormControl) {
          //{4}
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          //{5}
          this.validateAllFormFields(control); //{6}
        }
      });
    }


}

