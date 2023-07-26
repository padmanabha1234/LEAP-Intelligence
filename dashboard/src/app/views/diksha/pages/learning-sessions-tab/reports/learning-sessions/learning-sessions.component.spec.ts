import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { LearningSessionsComponent } from './learning-sessions.component';
            
            describe('LearningSessionsComponent', () => {
              let component: LearningSessionsComponent;
              let fixture: ComponentFixture<LearningSessionsComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ LearningSessionsComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(LearningSessionsComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            