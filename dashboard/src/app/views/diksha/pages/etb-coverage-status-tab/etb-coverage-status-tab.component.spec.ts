
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtbCoverageStatusTabComponent } from './etb-coverage-status-tab.component';

describe('EtbCoverageStatusTabComponent', () => {
    let component: EtbCoverageStatusTabComponent;
    let fixture: ComponentFixture<EtbCoverageStatusTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ EtbCoverageStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtbCoverageStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
