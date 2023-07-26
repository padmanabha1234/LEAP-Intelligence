
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialBaseTabComponent } from './potential-base-tab.component';

describe('PotentialBaseTabComponent', () => {
    let component: PotentialBaseTabComponent;
    let fixture: ComponentFixture<PotentialBaseTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ PotentialBaseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialBaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
