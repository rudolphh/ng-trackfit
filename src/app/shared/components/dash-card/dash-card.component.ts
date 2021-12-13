import { Component } from '@angular/core';

@Component({
  selector: 'app-dash-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[app-card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content select="[app-card-body]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./dash-card.component.css'],
})
export class DashCardComponent {}
