import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroImprovementsComponent } from './micro-improvements.component';

describe('MicroImprovementsComponent', () => {
  let component: MicroImprovementsComponent;
  let fixture: ComponentFixture<MicroImprovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroImprovementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroImprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
