import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAttendanceMapComponent } from './teacher-attendance-map.component';

describe('TeacherAttendanceMapComponent', () => {
  let component: TeacherAttendanceMapComponent;
  let fixture: ComponentFixture<TeacherAttendanceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAttendanceMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAttendanceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
