import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderWiseStudentEnrollmentComponent } from './gender-wise-student-enrollment.component';

describe('GenderWiseStudentEnrollmentComponent', () => {
  let component: GenderWiseStudentEnrollmentComponent;
  let fixture: ComponentFixture<GenderWiseStudentEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderWiseStudentEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderWiseStudentEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
