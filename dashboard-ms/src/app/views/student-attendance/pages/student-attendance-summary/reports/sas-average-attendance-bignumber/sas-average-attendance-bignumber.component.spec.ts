import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SasAverageAttendanceBignumberComponent } from './sas-average-attendance-bignumber.component';

describe('SasAverageAttendanceBignumberComponent', () => {
  let component: SasAverageAttendanceBignumberComponent;
  let fixture: ComponentFixture<SasAverageAttendanceBignumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SasAverageAttendanceBignumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SasAverageAttendanceBignumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
