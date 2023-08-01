import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { DistrictWiseStatusComponent } from './district-wise-status.component';
            
            describe('DistrictWiseStatusComponent', () => {
              let component: DistrictWiseStatusComponent;
              let fixture: ComponentFixture<DistrictWiseStatusComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ DistrictWiseStatusComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(DistrictWiseStatusComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            