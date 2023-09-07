import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { EtbCoverageStatusComponentBignumber } from './etb-coverage-status-bignumber.component';
            
            describe('EtbCoverageStatusComponentBignumber', () => {
              let component: EtbCoverageStatusComponentBignumber;
              let fixture: ComponentFixture<EtbCoverageStatusComponentBignumber>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ EtbCoverageStatusComponentBignumber ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(EtbCoverageStatusComponentBignumber);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            