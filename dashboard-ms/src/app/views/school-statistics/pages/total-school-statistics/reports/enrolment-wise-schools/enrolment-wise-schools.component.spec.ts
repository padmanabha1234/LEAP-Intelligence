import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolmentWiseSchoolsComponent } from './enrolment-wise-schools.component';

describe('EnrolmentWiseSchoolsComponent', () => {
  let component: EnrolmentWiseSchoolsComponent;
  let fixture: ComponentFixture<EnrolmentWiseSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolmentWiseSchoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolmentWiseSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
