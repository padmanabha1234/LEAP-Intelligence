import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmPoshanComponent } from './pmposhan.component';

describe('PmPoshanComponent', () => {
    let component: PmPoshanComponent;
    let fixture: ComponentFixture<PmPoshanComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ PmPoshanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmPoshanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
