import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacAverageAttendanceComplianceComponent } from './sac-average-attendance-compliance.component';

describe('SacAverageAttendanceComplianceComponent', () => {
  let component: SacAverageAttendanceComplianceComponent;
  let fixture: ComponentFixture<SacAverageAttendanceComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacAverageAttendanceComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacAverageAttendanceComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
