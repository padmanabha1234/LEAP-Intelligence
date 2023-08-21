import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisancSurveyMapComponent } from './disanc-survey-map.component';

describe('DisancSurveyMapComponent', () => {
  let component: DisancSurveyMapComponent;
  let fixture: ComponentFixture<DisancSurveyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisancSurveyMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisancSurveyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
