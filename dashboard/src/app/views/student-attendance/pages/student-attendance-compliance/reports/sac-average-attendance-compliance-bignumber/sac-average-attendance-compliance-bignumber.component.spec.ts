import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacAverageAttendanceComplianceBignumberComponent } from './sac-average-attendance-compliance-bignumber.component';

describe('SacAverageAttendanceComplianceBignumberComponent', () => {
  let component: SacAverageAttendanceComplianceBignumberComponent;
  let fixture: ComponentFixture<SacAverageAttendanceComplianceBignumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacAverageAttendanceComplianceBignumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacAverageAttendanceComplianceBignumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
