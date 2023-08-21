import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementsStatusTabComponent } from './improvements-status-tab.component';

describe('ImprovementsStatusTabComponent', () => {
  let component: ImprovementsStatusTabComponent;
  let fixture: ComponentFixture<ImprovementsStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprovementsStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprovementsStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
