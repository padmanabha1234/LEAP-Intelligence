import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsRankInAveragePupilTeacherRatioComponent } from './ts-rank-in-average-pupil-teacher-ratio.component';

describe('TsRankInAveragePupilTeacherRatioComponent', () => {
  let component: TsRankInAveragePupilTeacherRatioComponent;
  let fixture: ComponentFixture<TsRankInAveragePupilTeacherRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsRankInAveragePupilTeacherRatioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsRankInAveragePupilTeacherRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
