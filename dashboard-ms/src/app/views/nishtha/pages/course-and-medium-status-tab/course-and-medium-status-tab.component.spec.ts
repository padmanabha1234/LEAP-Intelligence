
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAndMediumStatusTabComponent } from './course-and-medium-status-tab.component';

describe('CourseAndMediumStatusTabComponent', () => {
    let component: CourseAndMediumStatusTabComponent;
    let fixture: ComponentFixture<CourseAndMediumStatusTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ CourseAndMediumStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAndMediumStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
