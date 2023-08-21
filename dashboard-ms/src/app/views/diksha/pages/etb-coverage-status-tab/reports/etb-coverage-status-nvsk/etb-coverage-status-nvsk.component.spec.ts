import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtbCoverageStatusNvskComponent } from './etb-coverage-status-nvsk.component';

describe('EtbCoverageStatusNvskComponent', () => {
  let component: EtbCoverageStatusNvskComponent;
  let fixture: ComponentFixture<EtbCoverageStatusNvskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtbCoverageStatusNvskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtbCoverageStatusNvskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
