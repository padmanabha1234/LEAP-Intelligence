import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseAverageAttendanceComponent } from './grade-wise-average-attendance.component';

describe('GradeWiseAverageAttendanceComponent', () => {
  let component: GradeWiseAverageAttendanceComponent;
  let fixture: ComponentFixture<GradeWiseAverageAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeWiseAverageAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeWiseAverageAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
