import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserSettings } from 'src/app/core/models/user-settings';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  @Input() userSettings !: UserSettings;
  @Input() lastWeight$: Observable<number> = of(215);
  @Input() latestBodyFat$: Observable<number> = of(0.00);
  @Input() leanBodyMass$: Observable<number> = of(0.01);
  @Input() bmr$: Observable<number> = of(0.01);

  constructor() {}

  ngOnInit(): void {}
}
