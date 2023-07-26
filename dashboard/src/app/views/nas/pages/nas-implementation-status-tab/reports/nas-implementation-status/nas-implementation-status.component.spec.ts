import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasImplementationStatusComponent } from './nas-implementation-status.component';

describe('NasImplementationStatusComponent', () => {
  let component: NasImplementationStatusComponent;
  let fixture: ComponentFixture<NasImplementationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NasImplementationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasImplementationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
