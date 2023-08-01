import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcfBignumberComponent } from './ncf-bignumber.component';

describe('NcfBignumberComponent', () => {
  let component: NcfBignumberComponent;
  let fixture: ComponentFixture<NcfBignumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcfBignumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NcfBignumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
