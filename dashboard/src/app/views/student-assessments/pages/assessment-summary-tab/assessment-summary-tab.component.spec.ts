import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSummaryTabComponent } from './assessment-summary-tab.component';

describe('AssessmentSummaryTabComponent', () => {
  let component: AssessmentSummaryTabComponent;
  let fixture: ComponentFixture<AssessmentSummaryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentSummaryTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentSummaryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
