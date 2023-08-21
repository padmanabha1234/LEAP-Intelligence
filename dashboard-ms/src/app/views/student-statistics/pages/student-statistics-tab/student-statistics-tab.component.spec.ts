import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatisticsTabComponent } from './student-statistics-tab.component';

describe('StudentStatisticsTabComponent', () => {
  let component: StudentStatisticsTabComponent;
  let fixture: ComponentFixture<StudentStatisticsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentStatisticsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStatisticsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
