import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ApiResponse } from '../_models/api-response';

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
  loading = false;
  returnUrl ?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

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

      this.loading = true;
      this.authService
        .login(this.user.email!, this.user.password!)
        .subscribe((res : ApiResponse) => {
          if (!res.data) {
            this.authError = res.message;
            return;
          }
          // login successful so redirect to return url
          this.router.navigateByUrl(this.returnUrl!);

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
