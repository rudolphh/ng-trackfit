import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ApiResponse } from '../../core/models/api-response';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user!: User;
  submitted = false;
  attemptedSubmit: boolean = false;
  authError: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: [this.user?.username, Validators.required],
        email: [this.user?.email, Validators.required],
        password: [
          this.user?.password,
          [Validators.required, Validators.minLength(6)],
        ],
        passwordConfirm: [
          this.user?.passwordConfirm,
          [Validators.required, Validators.minLength(6)],
        ],
      },
      {
        Validator: this.checkIfMatchingPasswords('password', 'passwordConfirm')
      } as AbstractControlOptions
    );
  }

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ): (group: FormGroup) => void {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ error: String });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  /// get f() {return this.form.controls}

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.submitted = true;
      this.userService.register(this.registerForm.value).subscribe(
        (res: ApiResponse) => {
          this.router.navigate(['../login']);
          console.log(res.message);
        },
        (error) => {
          this.authError = error;
          return;
        }
      );
    } else {
      this.attemptedSubmit = true;
      this.validateAllFormFields(this.registerForm);
    }
  }

  isRequiredFieldValid(field: string): boolean {
    return (
      this.attemptedSubmit &&
      this.registerForm.get(field)!.touched &&
      this.registerForm.get(field)!.errors?.required
    );
  }

  isPatternFieldValid(field: string) {
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
