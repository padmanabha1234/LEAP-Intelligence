import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroImprovementsMetricsComponent } from './micro-improvements-metrics.component';

describe('MicroImprovementsMetricsComponent', () => {
  let component: MicroImprovementsMetricsComponent;
  let fixture: ComponentFixture<MicroImprovementsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroImprovementsMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroImprovementsMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
