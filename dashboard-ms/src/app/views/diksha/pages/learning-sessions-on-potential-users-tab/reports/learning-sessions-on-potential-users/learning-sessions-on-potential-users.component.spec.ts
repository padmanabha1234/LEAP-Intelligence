import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { LearningSessionsOnPotentialUsersComponent } from './learning-sessions-on-potential-users.component';
            
            describe('LearningSessionsOnPotentialUsersComponent', () => {
              let component: LearningSessionsOnPotentialUsersComponent;
              let fixture: ComponentFixture<LearningSessionsOnPotentialUsersComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ LearningSessionsOnPotentialUsersComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(LearningSessionsOnPotentialUsersComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            