import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmposhanBignumberMetricsComponent } from './pmposhan-bignumber-metrics.component';

describe('PmposhanBignumberMetricsComponent', () => {
  let component: PmposhanBignumberMetricsComponent;
  let fixture: ComponentFixture<PmposhanBignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmposhanBignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmposhanBignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
