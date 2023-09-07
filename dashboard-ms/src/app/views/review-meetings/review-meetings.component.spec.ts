import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMeetingsComponent } from './review-meetings.component';

describe('ReviewMeetingsComponent', () => {
  let component: ReviewMeetingsComponent;
  let fixture: ComponentFixture<ReviewMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
