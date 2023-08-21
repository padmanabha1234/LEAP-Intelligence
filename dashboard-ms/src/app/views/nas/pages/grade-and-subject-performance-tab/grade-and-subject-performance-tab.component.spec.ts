
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAndSubjectPerformanceTabComponent } from './grade-and-subject-performance-tab.component';

describe('GradeAndSubjectPerformanceTabComponent', () => {
    let component: GradeAndSubjectPerformanceTabComponent;
    let fixture: ComponentFixture<GradeAndSubjectPerformanceTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ GradeAndSubjectPerformanceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeAndSubjectPerformanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
