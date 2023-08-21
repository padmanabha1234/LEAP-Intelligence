import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageAttendanceSchoolTableComponent } from './average-attendance-school-table.component';

describe('AverageAttendanceSchoolTableComponent', () => {
  let component: AverageAttendanceSchoolTableComponent;
  let fixture: ComponentFixture<AverageAttendanceSchoolTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageAttendanceSchoolTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageAttendanceSchoolTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
