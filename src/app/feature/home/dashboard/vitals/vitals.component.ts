import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  @Input() lastWeight$: Observable<number> = of(215);
  @Input() latestBodyFat$ : Observable<number> = of(0.00);

  constructor() {
    this.latestBodyFat$.subscribe(data => console.log(data))
  }

  ngOnInit(): void {}
}
