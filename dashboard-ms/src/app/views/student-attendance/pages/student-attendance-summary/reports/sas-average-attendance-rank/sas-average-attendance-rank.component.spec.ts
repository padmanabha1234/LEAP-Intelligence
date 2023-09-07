import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SasAverageAttendanceRankComponent } from './sas-average-attendance-rank.component';

describe('SasAverageAttendanceRankComponent', () => {
  let component: SasAverageAttendanceRankComponent;
  let fixture: ComponentFixture<SasAverageAttendanceRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SasAverageAttendanceRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SasAverageAttendanceRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
