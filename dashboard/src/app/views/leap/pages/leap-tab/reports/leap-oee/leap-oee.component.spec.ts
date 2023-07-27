import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapOeeComponent } from './leap-oee.component';

describe('LeapOeeComponent', () => {
  let component: LeapOeeComponent;
  let fixture: ComponentFixture<LeapOeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapOeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapOeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
