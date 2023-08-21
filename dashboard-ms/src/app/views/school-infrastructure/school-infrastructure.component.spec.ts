import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInfrastructureComponent } from './school-infrastructure.component';

describe('SchoolInfraComponent', () => {
  let component: SchoolInfrastructureComponent;
  let fixture: ComponentFixture<SchoolInfrastructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInfrastructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
