import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStatisticsComponent } from './school-statistics.component';

describe('SchoolStatisticsComponent', () => {
  let component: SchoolStatisticsComponent;
  let fixture: ComponentFixture<SchoolStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
