
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationTabComponent } from './correlation-tab.component';

describe('CorrelationTabComponent', () => {
    let component: CorrelationTabComponent;
    let fixture: ComponentFixture<CorrelationTabComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ CorrelationTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrelationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
