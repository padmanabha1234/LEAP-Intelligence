import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { ContentCoverageComponent } from './content-coverage.component';
            
            describe('ContentCoverageComponent', () => {
              let component: ContentCoverageComponent;
              let fixture: ComponentFixture<ContentCoverageComponent>;
            
              beforeEach(async () => {
                await TestBed.configureTestingModule({
                  declarations: [ ContentCoverageComponent ]
                })
                .compileComponents();
            
                fixture = TestBed.createComponent(ContentCoverageComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            
              it('should create', () => {
                expect(component).toBeTruthy();
              });
            });
            