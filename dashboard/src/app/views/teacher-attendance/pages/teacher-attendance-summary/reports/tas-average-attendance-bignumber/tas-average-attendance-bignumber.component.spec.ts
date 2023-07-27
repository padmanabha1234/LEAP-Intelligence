import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasAverageAttendanceBignumberComponent } from './tas-average-attendance-bignumber.component';

describe('TasAverageAttendanceBignumberComponent', () => {
  let component: TasAverageAttendanceBignumberComponent;
  let fixture: ComponentFixture<TasAverageAttendanceBignumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasAverageAttendanceBignumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasAverageAttendanceBignumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
