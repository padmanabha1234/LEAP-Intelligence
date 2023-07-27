import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationStatusTabComponent } from './participation-status-tab.component';

describe('ParticipationStatusTabComponent', () => {
  let component: ParticipationStatusTabComponent;
  let fixture: ComponentFixture<ParticipationStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipationStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipationStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
