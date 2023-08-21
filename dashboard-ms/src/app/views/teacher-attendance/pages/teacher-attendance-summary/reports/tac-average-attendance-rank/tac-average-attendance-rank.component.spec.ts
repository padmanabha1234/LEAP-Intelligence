import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacAverageAttendanceRankComponent } from './tac-average-attendance-rank.component';

describe('TacAverageAttendanceRankComponent', () => {
  let component: TacAverageAttendanceRankComponent;
  let fixture: ComponentFixture<TacAverageAttendanceRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacAverageAttendanceRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacAverageAttendanceRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
