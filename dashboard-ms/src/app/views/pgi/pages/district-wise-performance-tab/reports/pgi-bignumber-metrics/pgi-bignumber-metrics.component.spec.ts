import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgiBignumberMetricsComponent } from './pgi-bignumber-metrics.component';

describe('PgiBignumberMetricsComponent', () => {
  let component: PgiBignumberMetricsComponent;
  let fixture: ComponentFixture<PgiBignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgiBignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgiBignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
