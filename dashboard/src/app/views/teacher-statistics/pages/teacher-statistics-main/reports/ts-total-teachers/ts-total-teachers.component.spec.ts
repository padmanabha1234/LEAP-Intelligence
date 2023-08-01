import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsTotalTeachersComponent } from './ts-total-teachers.component';

describe('TsTotalTeachersComponent', () => {
  let component: TsTotalTeachersComponent;
  let fixture: ComponentFixture<TsTotalTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsTotalTeachersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsTotalTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
