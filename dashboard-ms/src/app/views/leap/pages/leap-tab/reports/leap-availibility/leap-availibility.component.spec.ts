import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapAvailibilityComponent } from './leap-availibility.component';

describe('LeapAvailibilityComponent', () => {
  let component: LeapAvailibilityComponent;
  let fixture: ComponentFixture<LeapAvailibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapAvailibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapAvailibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
