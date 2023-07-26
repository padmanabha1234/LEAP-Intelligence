import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasAverageAttendanceBarchartComponent } from './tas-average-attendance-barchart.component';

describe('TasAverageAttendanceBarchartComponent', () => {
  let component: TasAverageAttendanceBarchartComponent;
  let fixture: ComponentFixture<TasAverageAttendanceBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasAverageAttendanceBarchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasAverageAttendanceBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
