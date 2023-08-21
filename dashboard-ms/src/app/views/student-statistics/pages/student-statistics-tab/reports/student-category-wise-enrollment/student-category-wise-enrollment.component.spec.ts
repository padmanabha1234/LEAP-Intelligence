import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCategoryWiseEnrollmentComponent } from './student-category-wise-enrollment.component';

describe('StudentCategoryWiseEnrollmentComponent', () => {
  let component: StudentCategoryWiseEnrollmentComponent;
  let fixture: ComponentFixture<StudentCategoryWiseEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCategoryWiseEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCategoryWiseEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
