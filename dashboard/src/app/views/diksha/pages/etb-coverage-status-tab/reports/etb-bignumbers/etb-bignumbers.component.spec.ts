import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtbBignumbersComponent } from './etb-bignumbers.component';

describe('EtbBignumbersComponent', () => {
  let component: EtbBignumbersComponent;
  let fixture: ComponentFixture<EtbBignumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtbBignumbersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtbBignumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
