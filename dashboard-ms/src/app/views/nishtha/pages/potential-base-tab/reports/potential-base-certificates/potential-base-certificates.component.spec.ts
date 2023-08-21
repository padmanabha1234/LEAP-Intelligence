import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialBaseCertificatesComponent } from './potential-base-certificates.component';

describe('PotentialBaseCertificatesComponent', () => {
  let component: PotentialBaseCertificatesComponent;
  let fixture: ComponentFixture<PotentialBaseCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialBaseCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialBaseCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
