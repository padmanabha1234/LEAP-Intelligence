import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { CourseWiseStatusComponent } from './course-wise-status.component';
            
            describe('CourseWiseStatusComponent', () => {
              let component: CourseWiseStatusComponent;
              let fixture: ComponentFixture<CourseWiseStatusComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ CourseWiseStatusComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(CourseWiseStatusComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            