import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { GradeAndSubjectPerformanceComponent } from './grade-and-subject-performance.component';
            
            describe('GradeAndSubjectPerformanceComponent', () => {
              let component: GradeAndSubjectPerformanceComponent;
              let fixture: ComponentFixture<GradeAndSubjectPerformanceComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ GradeAndSubjectPerformanceComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(GradeAndSubjectPerformanceComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            