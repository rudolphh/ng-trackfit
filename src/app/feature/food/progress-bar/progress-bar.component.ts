import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <mat-progress-bar
      mode="determinate"
      [value]="percent"
      [ngClass]="progressBarColor()"
    ></mat-progress-bar>
    <div class="float-left mt-2"
      >Remaining :
      <span [ngClass]="remainingColor()">{{ remaining }}</span>
    </div>
  `,
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() percent = 0;
  @Input() remaining = 0;

  progressBarColor(): string {
    // background-color: #2aa198; success
    // #b58900; primary
    // d33682; danger
    return this.percent < 75
      ? 'success-progress'
      : this.percent < 100
        ? 'primary-progress'
        : 'danger-progress';
  }

  remainingColor(): string {
    return this.percent < 75
      ? 'light-text-success'
      : this.percent < 100
        ? 'light-text-primary'
        : 'light-text-danger';
  }
}
