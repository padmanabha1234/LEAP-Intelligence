import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceSummaryComponent } from './student-attendance-summary.component';

describe('StudentAttendanceSummaryComponent', () => {
  let component: StudentAttendanceSummaryComponent;
  let fixture: ComponentFixture<StudentAttendanceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttendanceSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAttendanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
