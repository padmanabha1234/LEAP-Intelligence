import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgStuAsseesScoreBignoComponent } from './avg-stu-assees-score-bigno.component';

describe('AvgStuAsseesScoreBignoComponent', () => {
  let component: AvgStuAsseesScoreBignoComponent;
  let fixture: ComponentFixture<AvgStuAsseesScoreBignoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgStuAsseesScoreBignoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvgStuAsseesScoreBignoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
