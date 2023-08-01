import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasBignumberMetricsComponent } from './nas-bignumber-metrics.component';

describe('NasBignumberMetricsComponent', () => {
  let component: NasBignumberMetricsComponent;
  let fixture: ComponentFixture<NasBignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasBignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasBignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
