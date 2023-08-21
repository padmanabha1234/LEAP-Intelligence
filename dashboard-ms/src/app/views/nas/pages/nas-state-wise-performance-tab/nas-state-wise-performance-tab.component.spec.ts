import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasStateWisePerformanceTabComponent } from './nas-state-wise-performance-tab.component';

describe('NasStateWisePerformanceTabComponent', () => {
  let component: NasStateWisePerformanceTabComponent;
  let fixture: ComponentFixture<NasStateWisePerformanceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasStateWisePerformanceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasStateWisePerformanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
