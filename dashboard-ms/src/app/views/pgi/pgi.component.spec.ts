import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgiComponent } from './pgi.component';

describe('PgiComponent', () => {
    let component: PgiComponent;
    let fixture: ComponentFixture<PgiComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ PgiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
