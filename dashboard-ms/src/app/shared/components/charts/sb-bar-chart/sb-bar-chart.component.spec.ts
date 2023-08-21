import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbBarChartComponent } from './sb-bar-chart.component';

describe('SbBarChartComponent', () => {
  let component: SbBarChartComponent;
  let fixture: ComponentFixture<SbBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
