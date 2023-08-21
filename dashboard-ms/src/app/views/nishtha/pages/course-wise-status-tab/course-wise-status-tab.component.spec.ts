
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseWiseStatusTabComponent } from './course-wise-status-tab.component';

describe('CourseWiseStatusTabComponent', () => {
    let component: CourseWiseStatusTabComponent;
    let fixture: ComponentFixture<CourseWiseStatusTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ CourseWiseStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseWiseStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
