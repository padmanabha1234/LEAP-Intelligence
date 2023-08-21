import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialHeatChartDrilldownTableComponent } from './material-heat-chart-drilldown-table.component';

describe('MaterialHeatChartDrilldownTableComponent', () => {
  let component: MaterialHeatChartDrilldownTableComponent;
  let fixture: ComponentFixture<MaterialHeatChartDrilldownTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialHeatChartDrilldownTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialHeatChartDrilldownTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
