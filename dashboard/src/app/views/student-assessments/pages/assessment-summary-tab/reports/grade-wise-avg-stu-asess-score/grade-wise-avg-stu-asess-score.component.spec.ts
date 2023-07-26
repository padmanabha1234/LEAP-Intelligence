import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeWiseAvgStuAsessScoreComponent } from './grade-wise-avg-stu-asess-score.component';

describe('GradeWiseAvgStuAsessScoreComponent', () => {
  let component: GradeWiseAvgStuAsessScoreComponent;
  let fixture: ComponentFixture<GradeWiseAvgStuAsessScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeWiseAvgStuAsessScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeWiseAvgStuAsessScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
