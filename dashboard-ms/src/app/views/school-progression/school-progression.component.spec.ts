import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProgressionComponent } from './school-progression.component';

describe('SchoolProgComponent', () => {
  let component: SchoolProgressionComponent;
  let fixture: ComponentFixture<SchoolProgressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolProgressionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
