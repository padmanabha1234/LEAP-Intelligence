import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoSummaryTabComponent } from './lo-summary-tab.component';

describe('LoSummaryTabComponent', () => {
  let component: LoSummaryTabComponent;
  let fixture: ComponentFixture<LoSummaryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoSummaryTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoSummaryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
