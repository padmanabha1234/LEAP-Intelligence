
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressStatusTabComponent } from './progress-status-tab.component';

describe('ProgressStatusTabComponent', () => {
    let component: ProgressStatusTabComponent;
    let fixture: ComponentFixture<ProgressStatusTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ ProgressStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
