import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NipunBharatComponent } from './nipun-bharat.component';

describe('NipunBharatComponent', () => {
  let component: NipunBharatComponent;
  let fixture: ComponentFixture<NipunBharatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NipunBharatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NipunBharatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
