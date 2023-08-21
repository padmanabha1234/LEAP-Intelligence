import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceComplianceComponent } from './teacher-attendance-compliance.component';

describe('TeacherAttendanceComplianceComponent', () => {
  let component: TeacherAttendanceComplianceComponent;
  let fixture: ComponentFixture<TeacherAttendanceComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttendanceComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAttendanceComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
