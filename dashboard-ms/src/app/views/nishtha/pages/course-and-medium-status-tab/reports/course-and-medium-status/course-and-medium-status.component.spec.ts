import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { CourseAndMediumStatusComponent } from './course-and-medium-status.component';
            
            describe('CourseAndMediumStatusComponent', () => {
              let component: CourseAndMediumStatusComponent;
              let fixture: ComponentFixture<CourseAndMediumStatusComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ CourseAndMediumStatusComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(CourseAndMediumStatusComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            