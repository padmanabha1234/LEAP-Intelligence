import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapAlertsIframeComponent } from './leap-alerts-iframe.component';

describe('LeapAlertsIframeComponent', () => {
  let component: LeapAlertsIframeComponent;
  let fixture: ComponentFixture<LeapAlertsIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapAlertsIframeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapAlertsIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
