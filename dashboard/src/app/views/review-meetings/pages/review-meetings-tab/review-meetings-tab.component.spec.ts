import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMeetingsTabComponent } from './review-meetings-tab.component';

describe('ReviewMeetingsTabComponent', () => {
  let component: ReviewMeetingsTabComponent;
  let fixture: ComponentFixture<ReviewMeetingsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewMeetingsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewMeetingsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
