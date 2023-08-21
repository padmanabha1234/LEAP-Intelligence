import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMeetingsStatusComponent } from './review-meetings-status.component';

describe('ReviewMeetingsStatusComponent', () => {
  let component: ReviewMeetingsStatusComponent;
  let fixture: ComponentFixture<ReviewMeetingsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMeetingsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewMeetingsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
