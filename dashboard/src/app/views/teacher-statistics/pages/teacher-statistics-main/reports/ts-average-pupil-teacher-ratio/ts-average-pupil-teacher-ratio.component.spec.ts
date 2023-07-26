import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsAveragePupilTeacherRatioComponent } from './ts-average-pupil-teacher-ratio.component';

describe('TsAveragePupilTeacherRatioComponent', () => {
  let component: TsAveragePupilTeacherRatioComponent;
  let fixture: ComponentFixture<TsAveragePupilTeacherRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsAveragePupilTeacherRatioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsAveragePupilTeacherRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
