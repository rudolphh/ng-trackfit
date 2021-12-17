import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  @Input() latestWeight: Observable<number> = of(215);
  @Input() latestBodyFat: Observable<number> = of(0.2545);

  constructor() {

  }

  ngOnInit(): void {}
}
