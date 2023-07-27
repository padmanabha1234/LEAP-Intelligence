import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SasAverageAttendanceComponent } from './sas-average-attendance.component';

describe('SasAverageAttendanceComponent', () => {
  let component: SasAverageAttendanceComponent;
  let fixture: ComponentFixture<SasAverageAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SasAverageAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SasAverageAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
