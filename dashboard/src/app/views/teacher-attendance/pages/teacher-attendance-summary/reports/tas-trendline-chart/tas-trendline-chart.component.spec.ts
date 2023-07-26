import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasTrendlineChartComponent } from './tas-trendline-chart.component';

describe('TasTrendlineChartComponent', () => {
  let component: TasTrendlineChartComponent;
  let fixture: ComponentFixture<TasTrendlineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasTrendlineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasTrendlineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
