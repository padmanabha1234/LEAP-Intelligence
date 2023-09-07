import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSchoolsComponent } from './total-schools.component';

describe('TotalSchoolsComponent', () => {
  let component: TotalSchoolsComponent;
  let fixture: ComponentFixture<TotalSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSchoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
