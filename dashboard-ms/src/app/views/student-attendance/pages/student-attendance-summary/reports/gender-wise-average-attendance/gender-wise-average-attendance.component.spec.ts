import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderWiseAverageAttendanceComponent } from './gender-wise-average-attendance.component';

describe('GenderWiseAverageAttendanceComponent', () => {
  let component: GenderWiseAverageAttendanceComponent;
  let fixture: ComponentFixture<GenderWiseAverageAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderWiseAverageAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderWiseAverageAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
