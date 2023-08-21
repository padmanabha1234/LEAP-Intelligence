import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisancSurveyTabComponent } from './disanc-survey-tab.component';

describe('DisancSurveyTabComponent', () => {
  let component: DisancSurveyTabComponent;
  let fixture: ComponentFixture<DisancSurveyTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisancSurveyTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisancSurveyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
