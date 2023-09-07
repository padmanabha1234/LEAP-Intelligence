import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdiseBignumberMetricsComponent } from './udise-bignumber-metrics.component';

describe('UdiseBignumberMetricsComponent', () => {
  let component: UdiseBignumberMetricsComponent;
  let fixture: ComponentFixture<UdiseBignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UdiseBignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdiseBignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
