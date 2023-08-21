import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisancSurveyBarComponent } from './disanc-survey-bar.component';

describe('DisancSurveyBarComponent', () => {
  let component: DisancSurveyBarComponent;
  let fixture: ComponentFixture<DisancSurveyBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisancSurveyBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisancSurveyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
