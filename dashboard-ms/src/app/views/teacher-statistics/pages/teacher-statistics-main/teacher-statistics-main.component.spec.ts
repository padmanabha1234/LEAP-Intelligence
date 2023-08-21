import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStatisticsMainComponent } from './teacher-statistics-main.component';

describe('TeacherStatisticsMainComponent', () => {
  let component: TeacherStatisticsMainComponent;
  let fixture: ComponentFixture<TeacherStatisticsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherStatisticsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherStatisticsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
