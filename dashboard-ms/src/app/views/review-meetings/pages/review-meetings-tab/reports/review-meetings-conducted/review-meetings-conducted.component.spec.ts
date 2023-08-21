import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMeetingsConductedComponent } from './review-meetings-conducted.component';

describe('ReviewMeetingsConductedComponent', () => {
  let component: ReviewMeetingsConductedComponent;
  let fixture: ComponentFixture<ReviewMeetingsConductedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMeetingsConductedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewMeetingsConductedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
