import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWiseProgressStatusComponent } from './state-wise-progress-status.component';

describe('StateWiseProgressStatusComponent', () => {
  let component: StateWiseProgressStatusComponent;
  let fixture: ComponentFixture<StateWiseProgressStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateWiseProgressStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateWiseProgressStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
