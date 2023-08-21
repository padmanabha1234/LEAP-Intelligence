import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankStudentsAndCwsnEnrollmentComponent } from './rank-students-and-cwsn-enrollment.component';

describe('RankStudentsAndCwsnEnrollmentComponent', () => {
  let component: RankStudentsAndCwsnEnrollmentComponent;
  let fixture: ComponentFixture<RankStudentsAndCwsnEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankStudentsAndCwsnEnrollmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankStudentsAndCwsnEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
