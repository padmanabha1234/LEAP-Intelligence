import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacAttendanceComplianceRankComponent } from './sac-attendance-compliance-rank.component';

describe('SacAttendanceComplianceRankComponent', () => {
  let component: SacAttendanceComplianceRankComponent;
  let fixture: ComponentFixture<SacAttendanceComplianceRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SacAttendanceComplianceRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SacAttendanceComplianceRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
