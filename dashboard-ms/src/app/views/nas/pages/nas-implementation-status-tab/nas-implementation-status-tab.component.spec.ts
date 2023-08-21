import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasImplementationStatusTabComponent } from './nas-implementation-status-tab.component';

describe('NasImplementationStatusTabComponent', () => {
  let component: NasImplementationStatusTabComponent;
  let fixture: ComponentFixture<NasImplementationStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasImplementationStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasImplementationStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
