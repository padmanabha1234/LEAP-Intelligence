import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacAttendanceComplianceRankComponent } from './tac-attendance-compliance-rank.component';

describe('TacAttendanceComplianceRankComponent', () => {
  let component: TacAttendanceComplianceRankComponent;
  let fixture: ComponentFixture<TacAttendanceComplianceRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacAttendanceComplianceRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacAttendanceComplianceRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
