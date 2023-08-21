import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCoverageMapComponent } from './content-coverage-map.component';

describe('ContentCoverageMapComponent', () => {
  let component: ContentCoverageMapComponent;
  let fixture: ComponentFixture<ContentCoverageMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentCoverageMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCoverageMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
