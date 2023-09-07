import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseTotalSchoolsComponent } from './category-wise-total-schools.component';

describe('CategoryWiseTotalSchoolsComponent', () => {
  let component: CategoryWiseTotalSchoolsComponent;
  let fixture: ComponentFixture<CategoryWiseTotalSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryWiseTotalSchoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWiseTotalSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
