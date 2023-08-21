import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { DistrictWisePerformanceComponent } from './district-wise-performance.component';
            
            describe('DistrictWisePerformanceComponent', () => {
              let component: DistrictWisePerformanceComponent;
              let fixture: ComponentFixture<DistrictWisePerformanceComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ DistrictWisePerformanceComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(DistrictWisePerformanceComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            