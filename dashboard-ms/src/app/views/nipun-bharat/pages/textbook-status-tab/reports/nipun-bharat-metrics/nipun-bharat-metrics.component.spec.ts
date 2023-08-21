import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NipunBharatMetricsComponent } from './nipun-bharat-metrics.component';

describe('NipunBharatMetricsComponent', () => {
  let component: NipunBharatMetricsComponent;
  let fixture: ComponentFixture<NipunBharatMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NipunBharatMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NipunBharatMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
