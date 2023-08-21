
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSessionsTabComponent } from './learning-sessions-tab.component';

describe('LearningSessionsTabComponent', () => {
    let component: LearningSessionsTabComponent;
    let fixture: ComponentFixture<LearningSessionsTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ LearningSessionsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningSessionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
