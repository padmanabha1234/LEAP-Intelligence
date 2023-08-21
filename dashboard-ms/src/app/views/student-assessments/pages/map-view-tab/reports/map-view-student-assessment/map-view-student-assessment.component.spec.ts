import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewStudentAssessmentComponent } from './map-view-student-assessment.component';

describe('MapViewStudentAssessmentComponent', () => {
  let component: MapViewStudentAssessmentComponent;
  let fixture: ComponentFixture<MapViewStudentAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapViewStudentAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapViewStudentAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
