import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { AuthService } from '../_auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public user: User = {};
  public attemptedSubmit: boolean = false;

  public authError: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        this.user.password,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.user.email = this.email!.value;
      this.user.password = this.password!.value;

      this.authService
        .login(this.user.email!, this.user.password!)
        .subscribe((res) => {
          if (res.data) {
            console.log(res.data);
            //this.storageService.setItem('currentUser', JSON.stringify(res.data));// save user in storage
            this.router.navigate(['/home']);
          } else {
            console.log(res);
            this.authError = res.message;
          }
        });
    } else {
      // validate all form fields
      this.attemptedSubmit = true;
      this.validateAllFormFields(this.loginForm);
    }
  }

  isRequiredFieldValid(field: string) {
    return (
      this.attemptedSubmit &&
      this.loginForm.get(field)!.touched &&
      this.loginForm.get(field)!.errors?.required
    );
  }

  isPatternFieldValid(field: string) {
    return (
      this.attemptedSubmit &&
      this.loginForm.get(field)!.touched &&
      this.loginForm.get(field)!.errors?.pattern
    );
  }

  isMinLengthFieldValid(field: string) {
    return (
      this.attemptedSubmit &&
      this.loginForm.get(field)!.touched &&
      this.loginForm.get(field)!.errors?.minLength
    );
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid':
        this.attemptedSubmit &&
        this.loginForm.get(field)!.invalid &&
        this.loginForm.get(field)!.touched,
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

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  navigateToReset() {
    this.router.navigate(['reset']);
  }
}
