import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMeetingsConductedBignumberComponent } from './review-meetings-conducted-bignumber.component';

describe('ReviewMeetingsConductedBignumberComponent', () => {
  let component: ReviewMeetingsConductedBignumberComponent;
  let fixture: ComponentFixture<ReviewMeetingsConductedBignumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMeetingsConductedBignumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewMeetingsConductedBignumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
