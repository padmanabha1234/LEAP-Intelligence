import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookStatusComponent } from './textbook-status.component';

describe('TextbookStatusComponent', () => {
  let component: TextbookStatusComponent;
  let fixture: ComponentFixture<TextbookStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextbookStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextbookStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
