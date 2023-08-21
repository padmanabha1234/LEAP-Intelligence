import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacAverageAttendanceComplianceComponent } from './tac-average-attendance-compliance.component';

describe('TacAverageAttendanceComplianceComponent', () => {
  let component: TacAverageAttendanceComplianceComponent;
  let fixture: ComponentFixture<TacAverageAttendanceComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacAverageAttendanceComplianceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacAverageAttendanceComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
