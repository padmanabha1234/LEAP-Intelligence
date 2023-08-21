import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCoverageBarComponent } from './content-coverage-bar.component';

describe('ContentCoverageBarComponent', () => {
  let component: ContentCoverageBarComponent;
  let fixture: ComponentFixture<ContentCoverageBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCoverageBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCoverageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
