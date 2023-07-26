import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacDialogComponent } from './rbac-dialog.component';

describe('RbacDialogComponent', () => {
  let component: RbacDialogComponent;
  let fixture: ComponentFixture<RbacDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RbacDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbacDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
