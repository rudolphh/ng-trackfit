import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementCreateEditComponent } from './measurement-create-edit.component';

describe('MeasurementCreateEditComponent', () => {
  let component: MeasurementCreateEditComponent;
  let fixture: ComponentFixture<MeasurementCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
