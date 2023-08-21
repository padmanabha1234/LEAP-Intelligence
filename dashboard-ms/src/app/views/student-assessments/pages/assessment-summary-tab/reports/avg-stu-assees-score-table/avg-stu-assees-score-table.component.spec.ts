import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgStuAsseesScoreTableComponent } from './avg-stu-assees-score-table.component';

describe('AvgStuAsseesScoreTableComponent', () => {
  let component: AvgStuAsseesScoreTableComponent;
  let fixture: ComponentFixture<AvgStuAsseesScoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgStuAsseesScoreTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgStuAsseesScoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
