import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapPerformanceComponent } from './leap-performance.component';

describe('LeapPerformanceComponent', () => {
  let component: LeapPerformanceComponent;
  let fixture: ComponentFixture<LeapPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
