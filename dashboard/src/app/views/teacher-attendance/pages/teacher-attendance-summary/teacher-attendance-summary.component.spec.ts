import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceSummaryComponent } from './teacher-attendance-summary.component';

describe('TeacherAttendanceSummaryComponent', () => {
  let component: TeacherAttendanceSummaryComponent;
  let fixture: ComponentFixture<TeacherAttendanceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttendanceSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAttendanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
