import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { PotentialBaseComponent } from './potential-base.component';
            
            describe('PotentialBaseComponent', () => {
              let component: PotentialBaseComponent;
              let fixture: ComponentFixture<PotentialBaseComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ PotentialBaseComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(PotentialBaseComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            