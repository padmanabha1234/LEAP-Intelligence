
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCoverageTabComponent } from './content-coverage-tab.component';

describe('ContentCoverageTabComponent', () => {
    let component: ContentCoverageTabComponent;
    let fixture: ComponentFixture<ContentCoverageTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ ContentCoverageTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentCoverageTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
