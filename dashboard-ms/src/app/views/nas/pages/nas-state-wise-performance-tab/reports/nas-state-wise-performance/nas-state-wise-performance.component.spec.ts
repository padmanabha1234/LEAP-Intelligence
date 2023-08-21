import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasStateWisePerformanceComponent } from './nas-state-wise-performance.component';

describe('NasStateWisePerformanceComponent', () => {
  let component: NasStateWisePerformanceComponent;
  let fixture: ComponentFixture<NasStateWisePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasStateWisePerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasStateWisePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
