import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAndCwsnEnrollmentComponent } from './students-and-cwsn-enrollment.component';

describe('StudentsAndCwsnEnrollmentComponent', () => {
  let component: StudentsAndCwsnEnrollmentComponent;
  let fixture: ComponentFixture<StudentsAndCwsnEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsAndCwsnEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsAndCwsnEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
