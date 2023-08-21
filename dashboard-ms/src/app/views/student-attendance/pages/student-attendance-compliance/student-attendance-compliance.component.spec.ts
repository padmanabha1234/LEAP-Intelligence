import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceComplianceComponent } from './student-attendance-compliance.component';

describe('StudentAttendanceComplianceComponent', () => {
  let component: StudentAttendanceComplianceComponent;
  let fixture: ComponentFixture<StudentAttendanceComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAttendanceComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAttendanceComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
