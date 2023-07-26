import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectWiseAvgStuAsessScoreComponent } from './subject-wise-avg-stu-asess-score.component';

describe('SubjectWiseAvgStuAsessScoreComponent', () => {
  let component: SubjectWiseAvgStuAsessScoreComponent;
  let fixture: ComponentFixture<SubjectWiseAvgStuAsessScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectWiseAvgStuAsessScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectWiseAvgStuAsessScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
