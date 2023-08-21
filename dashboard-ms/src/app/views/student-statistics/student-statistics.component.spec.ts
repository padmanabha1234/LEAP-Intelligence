import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatisticsComponent } from './student-statistics.component';

describe('StudentStatisticsComponent', () => {
  let component: StudentStatisticsComponent;
  let fixture: ComponentFixture<StudentStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
