
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSessionsOnPotentialUsersTabComponent } from './learning-sessions-on-potential-users-tab.component';

describe('LearningSessionsOnPotentialUsersTabComponent', () => {
    let component: LearningSessionsOnPotentialUsersTabComponent;
    let fixture: ComponentFixture<LearningSessionsOnPotentialUsersTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ LearningSessionsOnPotentialUsersTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningSessionsOnPotentialUsersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
