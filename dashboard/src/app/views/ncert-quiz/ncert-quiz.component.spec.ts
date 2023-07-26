import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcertQuizComponent } from './ncert-quiz.component';

describe('NcertQuizComponent', () => {
  let component: NcertQuizComponent;
  let fixture: ComponentFixture<NcertQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcertQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcertQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
