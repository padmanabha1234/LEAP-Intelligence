import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsCategoryWiseAveragePupilTeacherRatioComponent } from './ts-category-wise-average-pupil-teacher-ratio.component';

describe('TsCategoryWiseAveragePupilTeacherRatioComponent', () => {
  let component: TsCategoryWiseAveragePupilTeacherRatioComponent;
  let fixture: ComponentFixture<TsCategoryWiseAveragePupilTeacherRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsCategoryWiseAveragePupilTeacherRatioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsCategoryWiseAveragePupilTeacherRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
