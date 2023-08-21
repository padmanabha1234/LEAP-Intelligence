import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookStatusTabComponent } from './textbook-status-tab.component';

describe('TextbookStatusTabComponent', () => {
  let component: TextbookStatusTabComponent;
  let fixture: ComponentFixture<TextbookStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextbookStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextbookStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
