import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      passwordConfirm:['', Validators.required]
    })
  }
    get f() {return this.form.controls}

    onSubmit(){
      this.submitted = true;

      if(this.form.invalid){
        return;
      }

      this.loading = true;
      this.userService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {

        }
      })
    }
}
