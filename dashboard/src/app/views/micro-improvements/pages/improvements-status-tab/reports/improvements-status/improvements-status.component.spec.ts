import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementsStatusComponent } from './improvements-status.component';

describe('ImprovementsStatusComponent', () => {
  let component: ImprovementsStatusComponent;
  let fixture: ComponentFixture<ImprovementsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprovementsStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprovementsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
