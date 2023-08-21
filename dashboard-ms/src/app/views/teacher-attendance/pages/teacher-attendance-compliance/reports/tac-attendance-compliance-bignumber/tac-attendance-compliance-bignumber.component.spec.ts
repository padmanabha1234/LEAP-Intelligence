import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacAttendanceComplianceBignumberComponent } from './tac-attendance-compliance-bignumber.component';

describe('TacAttendanceComplianceBignumberComponent', () => {
  let component: TacAttendanceComplianceBignumberComponent;
  let fixture: ComponentFixture<TacAttendanceComplianceBignumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacAttendanceComplianceBignumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacAttendanceComplianceBignumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
