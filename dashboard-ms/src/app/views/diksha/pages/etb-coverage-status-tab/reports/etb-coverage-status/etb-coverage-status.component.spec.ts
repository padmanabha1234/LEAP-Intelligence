import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { EtbCoverageStatusComponent } from './etb-coverage-status.component';
            
            describe('EtbCoverageStatusComponent', () => {
              let component: EtbCoverageStatusComponent;
              let fixture: ComponentFixture<EtbCoverageStatusComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ EtbCoverageStatusComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(EtbCoverageStatusComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            