import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOptionsComponent } from './popup-options.component';

describe('PopupOptionsComponent', () => {
  let component: PopupOptionsComponent;
  let fixture: ComponentFixture<PopupOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
