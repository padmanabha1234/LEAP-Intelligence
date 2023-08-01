import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NishthaBignumberMetricsComponent } from './nishtha-bignumber-metrics.component';

describe('NishthaBignumberMetricsComponent', () => {
  let component: NishthaBignumberMetricsComponent;
  let fixture: ComponentFixture<NishthaBignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NishthaBignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NishthaBignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
