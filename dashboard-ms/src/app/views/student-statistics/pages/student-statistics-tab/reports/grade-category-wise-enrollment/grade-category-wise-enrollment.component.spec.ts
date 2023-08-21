import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCategoryWiseEnrollmentComponent } from './grade-category-wise-enrollment.component';

describe('GradeCategoryWiseEnrollmentComponent', () => {
  let component: GradeCategoryWiseEnrollmentComponent;
  let fixture: ComponentFixture<GradeCategoryWiseEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeCategoryWiseEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeCategoryWiseEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
