import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSchoolStatisticsComponent } from './total-school-statistics.component';

describe('TotalSchoolStatisticsComponent', () => {
  let component: TotalSchoolStatisticsComponent;
  let fixture: ComponentFixture<TotalSchoolStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSchoolStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSchoolStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
