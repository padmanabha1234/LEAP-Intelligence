import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalStudentsEnrolledComponent } from './total-students-enrolled.component';

describe('TotalStudentsEnrolledComponent', () => {
  let component: TotalStudentsEnrolledComponent;
  let fixture: ComponentFixture<TotalStudentsEnrolledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalStudentsEnrolledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalStudentsEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
