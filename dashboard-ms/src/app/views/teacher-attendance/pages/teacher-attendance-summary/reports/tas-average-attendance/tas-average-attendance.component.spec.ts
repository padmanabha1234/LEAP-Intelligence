import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasAverageAttendanceComponent } from './tas-average-attendance.component';

describe('TasAverageAttendanceComponent', () => {
  let component: TasAverageAttendanceComponent;
  let fixture: ComponentFixture<TasAverageAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasAverageAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasAverageAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
