
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictWiseStatusTabComponent } from './district-wise-status-tab.component';

describe('DistrictWiseStatusTabComponent', () => {
    let component: DistrictWiseStatusTabComponent;
    let fixture: ComponentFixture<DistrictWiseStatusTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ DistrictWiseStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictWiseStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
