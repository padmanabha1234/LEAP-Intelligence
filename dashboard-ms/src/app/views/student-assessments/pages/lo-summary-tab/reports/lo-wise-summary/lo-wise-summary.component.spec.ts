import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoWiseSummaryComponent } from './lo-wise-summary.component';

describe('LoWiseSummaryComponent', () => {
  let component: LoWiseSummaryComponent;
  let fixture: ComponentFixture<LoWiseSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoWiseSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
