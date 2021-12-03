import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  userDetailsForm !: FormGroup;
  weight!: number;
  BMR = 0;
  TDEE = 0;

  calCounterForm !: FormGroup;
  caloriesConsumed = 350;
  caloriesRemaining = 0;

  dietTypeForm !: FormGroup;
  trackingCalories = 0;

  stepOne = true;
  stepTwo = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.userDetailsForm = this.fb.group({
      age: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.min(1),
          Validators.max(130),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      gender: ['male', [Validators.required]],
      heightFeet: [
        '',
        [
          Validators.required,
          Validators.min(3),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      heightInches: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(11),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      weight: [
        this.weight,
        [
          Validators.required,
          Validators.min(30),
          Validators.max(1000),
          Validators.pattern(/^[0-9]*$/)
        ],
      ],
      activity: [ 'lazy', [Validators.required]]
    });

    this.userDetailsForm.valueChanges.subscribe(() => {
      if (this.userDetailsForm.valid) {
        /*******************************
          Mifflin-St Jeor Equation:
          For men: BMR = 10W + 6.25H - 5A + 5
          For women: BMR = 10W + 6.25H - 5A - 161
        *********************************/

        const weightKg = this.userDetailsForm.get('weight')?.value / 2.205;
        const heightFeet = +this.userDetailsForm.get('heightFeet')?.value;
        const heightInches = +this.userDetailsForm.get('heightInches')?.value;
        const heightCm = (12 * heightFeet + heightInches) * 2.54;

        this.BMR =
          10 * weightKg +
          6.25 * heightCm -
          5 * this.userDetailsForm.get('age')?.value;

        if (this.userDetailsForm.get('gender')?.value === 'male') { this.BMR += 5; }
        else { this.BMR -= 161; }

        switch (this.userDetailsForm.get('activity')?.value) {
          case 'lazy' : this.TDEE = this.BMR * 1.2; break;
          case 'resolute' : this.TDEE = this.BMR * 1.375; break;
          case 'fit' : this.TDEE = this.BMR * 1.465; break;
          case 'fitter' : this.TDEE = this.BMR * 1.55; break;
          case 'olympic' : this.TDEE = this.BMR * 1.725; break;
          case 'crazy' : this.TDEE = this.BMR * 1.9; break;
        }

        this.caloriesRemaining = this.TDEE;
        this.trackingCalories = this.TDEE;

        // execute after angular's data binding
        setTimeout(() => {
          document.getElementById('top')?.scrollIntoView({ behavior: 'smooth'});
          setTimeout(() => { this.stepTwo = true; }, 500);
        }, 500);

        console.log(this.BMR);
      } else {
        this.BMR = 0;
        this.TDEE = 0;
        this.stepOne = true;
        this.stepTwo = false;
      }
    });

    // cal counter form
    this.calCounterForm = this.fb.group({
      item: ['', [Validators.required]],
      cals: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^[0-9]*$/),
        ],
      ]
    });

    // diet type forms
    this.dietTypeForm = this.fb.group({
      dietType: [ 'lose',
      [
        Validators.required
      ]
    ]
    });

  } // end ngOnInit

  emojiReaction(): string {

    if (this.BMR === 0) {
      return 'assets/img/emoji-dead.png';
    }

    const activity = this.userDetailsForm.get('activity')?.value;

    switch (activity) {
      case 'resolute' : return 'assets/img/emoji-slight-smile.png';
      case 'fit' : return 'assets/img/emoji-grin.png';
      case 'fitter' : return 'assets/img/emoji-cool.png';
      case 'olympic' : return 'assets/img/emoji-steam.png';
      case 'crazy' : return 'assets/img/emoji-flexed.png';
      default: return 'assets/img/emoji-neutral.png';
    }
  }

  addCalories(): void {

    if (this.calCounterForm.valid){
      const item = this.calCounterForm.get('item')?.value;
      const cals = +this.calCounterForm.get('cals')?.value;

      this.caloriesConsumed += cals;
      this.caloriesRemaining -= cals;

      const ul = document.getElementById('item-list');
      const li = document.createElement('li');
      const i = document.createElement('i');

      i.className = 'fas fa-times float-right';
      i.style.marginTop = '3px';

      li.className = 'list-group-item';
      li.appendChild(document.createTextNode(item + ' : ' + cals));
      li.appendChild(i);
      ul?.appendChild(li);

      this.calCounterForm.get('cals')?.setValue('');
      this.calCounterForm.get('item')?.setValue('');

    }
  }

  dietTypeAmount(amount: number): void {
    const dietType = this.dietTypeForm.get('dietType')?.value;
    if (dietType === 'lose'){
      this.trackingCalories = this.TDEE - 500 * amount;
    } else {
      this.trackingCalories = this.TDEE + 500 * amount;
    }
    console.log('trackingCalories', this.trackingCalories);
  }

  goToStepTwo(): void{
    this.stepOne = false;
    document.getElementById('stepTwo')?.scrollIntoView({ behavior: 'smooth'});
  }
}
