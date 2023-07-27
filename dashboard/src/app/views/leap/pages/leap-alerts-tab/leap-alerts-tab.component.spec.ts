import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapAlertsTabComponent } from './leap-alerts-tab.component';

describe('LeapAlertsTabComponent', () => {
  let component: LeapAlertsTabComponent;
  let fixture: ComponentFixture<LeapAlertsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapAlertsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapAlertsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
