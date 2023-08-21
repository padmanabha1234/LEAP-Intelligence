
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictWisePerformanceTabComponent } from './district-wise-performance-tab.component';

describe('DistrictWisePerformanceTabComponent', () => {
    let component: DistrictWisePerformanceTabComponent;
    let fixture: ComponentFixture<DistrictWisePerformanceTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ DistrictWisePerformanceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictWisePerformanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
