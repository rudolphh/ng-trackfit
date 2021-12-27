import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-progress-bar',
  template: `
    <mat-progress-bar
      mode="determinate"
      [value]="percent"
      [ngClass]="progressBarColor()"
    ></mat-progress-bar>
  `,
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() percent = 0;

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
}
