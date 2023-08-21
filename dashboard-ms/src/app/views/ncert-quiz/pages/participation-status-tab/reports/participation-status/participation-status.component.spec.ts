import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationStatusComponent } from './participation-status.component';

describe('ParticipationStatusComponent', () => {
  let component: ParticipationStatusComponent;
  let fixture: ComponentFixture<ParticipationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
