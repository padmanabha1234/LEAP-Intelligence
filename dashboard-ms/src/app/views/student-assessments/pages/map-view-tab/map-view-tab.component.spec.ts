import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapViewTabComponent } from './map-view-tab.component';

describe('MapViewTabComponent', () => {
  let component: MapViewTabComponent;
  let fixture: ComponentFixture<MapViewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapViewTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapViewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
