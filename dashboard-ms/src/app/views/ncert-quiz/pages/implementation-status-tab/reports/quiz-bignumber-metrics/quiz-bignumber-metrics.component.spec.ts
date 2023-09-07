import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBignumberMetricsComponent } from './quiz-bignumber-metrics.component';

describe('QuizBignumberMetricsComponent', () => {
  let component: QuizBignumberMetricsComponent;
  let fixture: ComponentFixture<QuizBignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizBignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizBignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
