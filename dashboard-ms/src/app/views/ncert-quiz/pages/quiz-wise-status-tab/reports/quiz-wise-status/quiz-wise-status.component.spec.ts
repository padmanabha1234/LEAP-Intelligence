import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizWiseStatusComponent } from './quiz-wise-status.component';

describe('QuizWiseStatusComponent', () => {
  let component: QuizWiseStatusComponent;
  let fixture: ComponentFixture<QuizWiseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizWiseStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizWiseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
