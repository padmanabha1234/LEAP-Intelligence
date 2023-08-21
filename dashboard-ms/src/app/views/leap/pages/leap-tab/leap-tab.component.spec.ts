import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapTabComponent } from './leap-tab.component';

describe('LeapTabComponent', () => {
  let component: LeapTabComponent;
  let fixture: ComponentFixture<LeapTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
