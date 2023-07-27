import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsCategoryWiseTotalTeachersComponent } from './ts-category-wise-total-teachers.component';

describe('TsCategoryWiseTotalTeachersComponent', () => {
  let component: TsCategoryWiseTotalTeachersComponent;
  let fixture: ComponentFixture<TsCategoryWiseTotalTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsCategoryWiseTotalTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsCategoryWiseTotalTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
