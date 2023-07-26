import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizWiseStatusTabComponent } from './quiz-wise-status-tab.component';

describe('QuizWiseStatusTabComponent', () => {
  let component: QuizWiseStatusTabComponent;
  let fixture: ComponentFixture<QuizWiseStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizWiseStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizWiseStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
