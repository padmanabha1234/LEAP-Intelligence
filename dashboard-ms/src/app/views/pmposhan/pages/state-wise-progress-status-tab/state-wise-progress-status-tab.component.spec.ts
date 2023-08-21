import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWiseProgressStatusTabComponent } from './state-wise-progress-status-tab.component';

describe('StateWiseProgressStatusTabComponent', () => {
  let component: StateWiseProgressStatusTabComponent;
  let fixture: ComponentFixture<StateWiseProgressStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateWiseProgressStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateWiseProgressStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
